package urbantitan.code.dto.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import urbantitan.code.dto.brand.BrandResponseDTO;
import urbantitan.code.dto.category.CategoryResponseDTO;
import urbantitan.code.dto.product.ProductResponseDTO;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResultsDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BestMatch {
        private String type; // product | category | brand
        private String slug;
        private String label;
        private double score;
    }

    private BestMatch bestMatch;

    private List<ProductResponseDTO> products;
    private List<CategoryResponseDTO> categories;
    private List<BrandResponseDTO> brands;
}
