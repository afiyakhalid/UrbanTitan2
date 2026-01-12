package urbantitan.code.dto.checkout;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import urbantitan.code.enums.PaymentMethod;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderRequestDTO {

    @NotEmpty(message = "Cart items are required")
    @Valid
    private List<CartItemDTO> items;

    @NotNull(message = "Shipping address is required")
    @Valid
    private AddressDTO shippingAddress;

    private AddressDTO billingAddress;

    private boolean billingAddressSameAsShipping;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    private String customerNotes;
}
