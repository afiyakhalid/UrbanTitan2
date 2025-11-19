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
    private BigDecimal basePrice;
    private UUID brandId;
    private UUID categoryId;
    private Boolean isActive;
    private String primaryImageUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}