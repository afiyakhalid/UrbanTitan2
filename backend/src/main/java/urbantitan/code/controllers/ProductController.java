package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import urbantitan.code.dto.product.ProductRequestDTO;
import urbantitan.code.dto.product.ProductResponseDTO;
import urbantitan.code.dto.search.SearchSuggestionDTO;
import urbantitan.code.services.ProductService;
import urbantitan.code.services.SearchSuggestionService;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final SearchSuggestionService searchSuggestionService;

    @GetMapping("/")
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductResponseDTO> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductBySlug(slug));
    }

    @GetMapping("/category/{category_id}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCategoryId(@PathVariable UUID category_id) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByCategoryId(category_id));
    }

    @PostMapping("/")
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(requestDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updatePartialProduct(
            @PathVariable UUID id,
            @RequestBody Map<String, Object> updates
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.updatePartialProduct(id, updates));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable UUID id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Search endpoint returning product results.
     *
     * Behavior:
     * - If query best-matches a category (typo tolerant), return products in that category.
     * - Else, fall back to substring search on product name/slug.
     *
     * Example: GET /api/v1/products/search?q=cemt
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDTO>> searchProducts(
            @RequestParam(name = "q") String q,
            @RequestParam(name = "limit", defaultValue = "50") int limit
    ) {
        int safeLimit = Math.max(1, Math.min(limit, 200));

        // 1) Try to resolve query -> category (this makes "cemt" return Cement category products)
        List<SearchSuggestionDTO> catSuggestions = searchSuggestionService.suggest(
                q,
                3,
                2,
                java.util.EnumSet.of(SearchSuggestionService.SuggestType.category)
        );
        if (!catSuggestions.isEmpty() && catSuggestions.get(0).getScore() >= 0.55) {
            String categorySlug = catSuggestions.get(0).getSlug();
            List<ProductResponseDTO> byCategorySlug = productService.getProductsByCategorySlug(categorySlug);
            // If category match exists but has no products, we still fall back to text search below.
            if (!byCategorySlug.isEmpty()) {
                return ResponseEntity.ok(byCategorySlug.stream().limit(safeLimit).toList());
            }
        }

        // 2) Fallback: simple text search (name/slug LIKE)
        return ResponseEntity.ok(productService.searchProducts(q, safeLimit));
    }
}