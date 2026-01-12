package urbantitan.code.dto.checkout;

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
public class QuoteResponseDTO {

    private String currency;
    private List<QuoteLineItemDTO> lineItems;
    private BigDecimal subtotal;
    private BigDecimal discountTotal;
    private BigDecimal deliveryFee;
    private BigDecimal grandTotal;
    private String estimatedDelivery;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuoteLineItemDTO {
        private String productId;
        private String productName;
        private String brandName;
        private String productImage;
        private int quantity;
        private BigDecimal unitPrice;
        private BigDecimal mrp;
        private BigDecimal discountAmount;
        private BigDecimal lineTotal;
        private String quotationId;
        private String dealerName;
        private String dealerId;
    }
}
