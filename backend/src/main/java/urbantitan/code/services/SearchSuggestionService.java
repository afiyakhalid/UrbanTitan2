package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import urbantitan.code.dto.search.SearchSuggestionDTO;
import urbantitan.code.entities.Brand;
import urbantitan.code.entities.Category;
import urbantitan.code.entities.Product;
import urbantitan.code.repositories.BrandRepository;
import urbantitan.code.repositories.CategoryRepository;
import urbantitan.code.repositories.ProductRepository;
import urbantitan.code.services.search.FuzzyScorer;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class SearchSuggestionService {

    public enum SuggestType {
        product, category, brand
    }

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    /**
     * Returns up to {@code limit} suggestions for query {@code q} (buffer >= 2 recommended).
     */
    public List<SearchSuggestionDTO> suggest(String q, int limit, int buffer, EnumSet<SuggestType> types) {
        String query = q == null ? "" : q.trim();
        if (query.length() < buffer) {
            return List.of();
        }

        // Keep candidate pools bounded. Too large makes every request slow.
        int candidateLimitPerType = Math.max(30, limit * 12);

        // If LIKE-based candidate query returns almost nothing (common for typos), fall back.
        int minCandidatesBeforeFallback = Math.max(8, limit * 2);

        List<SearchSuggestionDTO> out = new ArrayList<>();

        if (types.contains(SuggestType.product)) {
            List<Product> products = productRepository.findSearchCandidates(query.toLowerCase(Locale.ROOT), candidateLimitPerType);
            if (products.size() < minCandidatesBeforeFallback) {
                products = productRepository.findFallbackCandidates(Math.max(60, candidateLimitPerType * 2));
            }
            for (Product p : products) {
                double score = Math.max(
                        FuzzyScorer.score(query, p.getName()),
                        FuzzyScorer.score(query, p.getSlug())
                );
                out.add(SearchSuggestionDTO.builder()
                        .type("product")
                        .label(p.getName())
                        .slug(p.getSlug())
                        .score(score)
                        .build());
            }
        }

        if (types.contains(SuggestType.category)) {
            List<Category> categories = categoryRepository.findSearchCandidates(query.toLowerCase(Locale.ROOT), candidateLimitPerType);
            if (categories.size() < minCandidatesBeforeFallback) {
                categories = categoryRepository.findFallbackCandidates(Math.max(80, candidateLimitPerType * 3));
            }
            for (Category c : categories) {
                double score = Math.max(
                        FuzzyScorer.score(query, c.getName()),
                        FuzzyScorer.score(query, c.getSlug())
                );
                out.add(SearchSuggestionDTO.builder()
                        .type("category")
                        .label(c.getName())
                        .slug(c.getSlug())
                        .score(score)
                        .build());
            }
        }

        if (types.contains(SuggestType.brand)) {
            List<Brand> brands = brandRepository.findSearchCandidates(query.toLowerCase(Locale.ROOT), candidateLimitPerType);
            if (brands.size() < minCandidatesBeforeFallback) {
                brands = brandRepository.findFallbackCandidates(Math.max(80, candidateLimitPerType * 3));
            }
            for (Brand b : brands) {
                double score = Math.max(
                        FuzzyScorer.score(query, b.getName()),
                        FuzzyScorer.score(query, b.getSlug())
                );
                out.add(SearchSuggestionDTO.builder()
                        .type("brand")
                        .label(b.getName())
                        .slug(b.getSlug())
                        .score(score)
                        .build());
            }
        }

        // Filter tiny scores so we don't return junk, then rank and return top N.
        double minScore = 0.22;
        return out.stream()
                .filter(s -> s.getScore() >= minScore)
                .sorted(Comparator.comparingDouble(SearchSuggestionDTO::getScore).reversed()
                        .thenComparing(SearchSuggestionDTO::getLabel))
                .limit(limit)
                .toList();
    }
}
