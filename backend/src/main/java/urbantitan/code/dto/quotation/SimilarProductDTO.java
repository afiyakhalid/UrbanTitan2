package urbantitan.code.dto.quotation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimilarProductDTO {

    private String productId;
    private String productName;
    private String productSlug;
    private String brandName;
    private String categoryName;
    private String productImage;

    private BigDecimal basePrice;
    private BigDecimal mrp;
    private BigDecimal rating;
    private Integer reviewCount;

    private QuotationDTO bestQuotation;
    private int totalQuotations;
}
