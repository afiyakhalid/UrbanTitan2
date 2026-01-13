package urbantitan.code.dto.quotation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuotationDTO {

    private String id;
    private String productId;
    private String productName;
    private String brandName;
    private String productImage;

    private String dealerId;
    private String dealerName;

    private BigDecimal unitPrice;
    private BigDecimal mrp;
    private BigDecimal discountPercent;

    private Integer minOrderQty;
    private Integer leadTimeDays;
    private Integer stockAvailable;

    private String notes;
    private String servicesOffered;

    private OffsetDateTime validUntil;
    private OffsetDateTime createdAt;
}
