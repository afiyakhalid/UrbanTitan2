package urbantitan.code.dto.product;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO {

    private UUID id;
    private String name;
    private String slug;
    private String description;
    private String volume;
    private String productCode;
    private BigDecimal basePrice;
    private BigDecimal mrp;
    private Integer couponOffer;
    private Integer treatsPoints;
    private BigDecimal rating;
    private Integer reviewCount;
    private String deliveryDate;
    private UUID brandId;
    private UUID categoryId;
    private String brandName;
    private String brandSlug;
    private String categoryName;
    private String categorySlug;
    private Boolean isActive;
    private String primaryImageUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}