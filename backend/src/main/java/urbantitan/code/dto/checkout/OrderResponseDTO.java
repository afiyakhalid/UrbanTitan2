package urbantitan.code.dto.checkout;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import urbantitan.code.enums.OrderStatus;
import urbantitan.code.enums.PaymentMethod;
import urbantitan.code.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {

    private String orderId;
    private String orderNumber;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;

    private BigDecimal subtotal;
    private BigDecimal discountAmount;
    private BigDecimal deliveryFee;
    private BigDecimal totalAmount;

    private AddressDTO shippingAddress;
    private String customerNotes;

    private List<OrderItemResponseDTO> items;

    private OffsetDateTime createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponseDTO {
        private String productId;
        private String productName;
        private int quantity;
        private BigDecimal unitPrice;
        private BigDecimal mrp;
        private BigDecimal discountAmount;
        private BigDecimal totalPrice;
        private String dealerName;
    }
}
