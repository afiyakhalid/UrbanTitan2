package urbantitan.code.dto.checkout;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuoteRequestDTO {

    @NotEmpty(message = "Cart items are required")
    @Valid
    private List<CartItemDTO> items;

    private String pincode;
}
