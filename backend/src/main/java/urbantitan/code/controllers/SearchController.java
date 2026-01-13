package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import urbantitan.code.dto.brand.BrandResponseDTO;
import urbantitan.code.dto.category.CategoryResponseDTO;
import urbantitan.code.dto.product.ProductResponseDTO;
import urbantitan.code.dto.search.SearchResultsDTO;
import urbantitan.code.dto.search.SearchSuggestionDTO;
import urbantitan.code.services.BrandService;
import urbantitan.code.services.CategoryService;
import urbantitan.code.services.ProductService;
import urbantitan.code.services.SearchSuggestionService;

import java.util.EnumSet;
import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchSuggestionService searchSuggestionService;
    private final ProductService productService;
    private final CategoryService categoryService;
    private final BrandService brandService;

    /**
     * Global typeahead endpoint.
     *
     * Example: GET /api/v1/search/suggest?q=cem&limit=5&buffer=2&types=product,category
     */

    @GetMapping("/suggest")
    public ResponseEntity<List<SearchSuggestionDTO>> suggest(
            @RequestParam(name = "q") String q,
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "buffer", defaultValue = "2") int buffer,
            @RequestParam(name = "types", required = false) String types
    ) {
        int safeLimit = Math.max(1, Math.min(limit, 10));
        int safeBuffer = Math.max(1, Math.min(buffer, 5));

        EnumSet<SearchSuggestionService.SuggestType> typeSet = parseTypes(types);

        return ResponseEntity.ok(searchSuggestionService.suggest(q, safeLimit, safeBuffer, typeSet));
    }

    /**
     * Returns actual search results for products/categories/brands.
     *
     * This is what your UI should use when user submits the search (Enter / search page).
     * Example: GET /api/v1/search?q=cemt
     */
    @GetMapping("")
    public ResponseEntity<SearchResultsDTO> search(
            @RequestParam(name = "q") String q,
            @RequestParam(name = "limit", defaultValue = "50") int limit
    ) {
        int safeLimit = Math.max(1, Math.min(limit, 200));

        List<SearchSuggestionDTO> suggestions = searchSuggestionService.suggest(
                q,
                10,
                2,
                EnumSet.allOf(SearchSuggestionService.SuggestType.class)
        );

        // Best match (for redirect). If nothing scored well, bestMatch stays null.
        SearchResultsDTO.BestMatch bestMatch = suggestions.isEmpty() ? null : SearchResultsDTO.BestMatch.builder()
                .type(suggestions.get(0).getType())
                .slug(suggestions.get(0).getSlug())
                .label(suggestions.get(0).getLabel())
                .score(suggestions.get(0).getScore())
                .build();
        if (bestMatch != null && bestMatch.getScore() < 0.40) {
            bestMatch = null;
        }

        // Prefer category/brand if they are strong; products are often too specific for redirect.
        String strongCategorySlug = suggestions.stream()
                .filter(s -> "category".equals(s.getType()))
                .filter(s -> s.getScore() >= 0.55)
                .map(SearchSuggestionDTO::getSlug)
                .findFirst()
                .orElse(null);

        String strongBrandSlug = suggestions.stream()
                .filter(s -> "brand".equals(s.getType()))
                .filter(s -> s.getScore() >= 0.55)
                .map(SearchSuggestionDTO::getSlug)
                .findFirst()
                .orElse(null);

        // If category/brand is strong, set bestMatch to that (redirect should go there).
        if (strongCategorySlug != null) {
            bestMatch = suggestions.stream()
                    .filter(s -> "category".equals(s.getType()) && strongCategorySlug.equals(s.getSlug()))
                    .findFirst()
                    .map(s -> SearchResultsDTO.BestMatch.builder()
                            .type("category")
                            .slug(s.getSlug())
                            .label(s.getLabel())
                            .score(s.getScore())
                            .build())
                    .orElse(bestMatch);
        } else if (strongBrandSlug != null) {
            bestMatch = suggestions.stream()
                    .filter(s -> "brand".equals(s.getType()) && strongBrandSlug.equals(s.getSlug()))
                    .findFirst()
                    .map(s -> SearchResultsDTO.BestMatch.builder()
                            .type("brand")
                            .slug(s.getSlug())
                            .label(s.getLabel())
                            .score(s.getScore())
                            .build())
                    .orElse(bestMatch);
        }

        List<ProductResponseDTO> products;
        if (strongCategorySlug != null) {
            products = productService.getProductsByCategorySlug(strongCategorySlug);
        } else {
            products = productService.searchProducts(q, safeLimit);
        }

        if (strongCategorySlug == null && strongBrandSlug != null) {
            List<ProductResponseDTO> brandProducts = productService.getProductsByBrandSlug(strongBrandSlug);
            java.util.LinkedHashMap<java.util.UUID, ProductResponseDTO> merged = new java.util.LinkedHashMap<>();
            for (ProductResponseDTO p : products) merged.put(p.getId(), p);
            for (ProductResponseDTO p : brandProducts) merged.put(p.getId(), p);
            products = merged.values().stream().limit(safeLimit).toList();
        } else {
            products = products.stream().limit(safeLimit).toList();
        }

        List<CategoryResponseDTO> categories;
        if (strongCategorySlug != null) {
            categories = List.of(categoryService.getCategoryBySlug(strongCategorySlug));
        } else {
            categories = categoryService.searchCategories(q, Math.min(10, safeLimit));
        }

        List<BrandResponseDTO> brands;
        if (strongBrandSlug != null) {
            brands = List.of(brandService.getBrandBySlug(strongBrandSlug));
        } else {
            brands = brandService.searchBrands(q, Math.min(10, safeLimit));
        }

        return ResponseEntity.ok(SearchResultsDTO.builder()
                .bestMatch(bestMatch)
                .products(products)
                .categories(categories)
                .brands(brands)
                .build());
    }

    private EnumSet<SearchSuggestionService.SuggestType> parseTypes(String types) {
        if (types == null || types.isBlank()) {
            return EnumSet.allOf(SearchSuggestionService.SuggestType.class);
        }

        EnumSet<SearchSuggestionService.SuggestType> out = EnumSet.noneOf(SearchSuggestionService.SuggestType.class);
        for (String part : types.split(",")) {
            String t = part.trim();
            if (t.isEmpty()) continue;
            try {
                // enum constants are declared as: product, category, brand
                out.add(SearchSuggestionService.SuggestType.valueOf(t.toLowerCase()));
            } catch (Exception ignored) {
                // Ignore invalid type
            }
        }
        return out.isEmpty() ? EnumSet.allOf(SearchSuggestionService.SuggestType.class) : out;
    }
}
