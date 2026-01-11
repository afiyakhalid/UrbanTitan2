package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import urbantitan.code.dto.search.SearchSuggestionDTO;
import urbantitan.code.services.SearchSuggestionService;

import java.util.EnumSet;
import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchSuggestionService searchSuggestionService;

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

    private EnumSet<SearchSuggestionService.SuggestType> parseTypes(String types) {
        if (types == null || types.isBlank()) {
            return EnumSet.allOf(SearchSuggestionService.SuggestType.class);
        }

        EnumSet<SearchSuggestionService.SuggestType> out = EnumSet.noneOf(SearchSuggestionService.SuggestType.class);
        for (String part : types.split(",")) {
            String t = part.trim().toLowerCase();
            try {
                out.add(SearchSuggestionService.SuggestType.valueOf(t));
            } catch (Exception ignored) {
                // Ignore invalid type
            }
        }
        return out.isEmpty() ? EnumSet.allOf(SearchSuggestionService.SuggestType.class) : out;
    }
}

