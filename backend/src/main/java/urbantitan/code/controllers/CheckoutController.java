package urbantitan.code.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import urbantitan.code.dto.checkout.*;
import urbantitan.code.services.CheckoutService;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping("/checkout/quote")
    public ResponseEntity<QuoteResponseDTO> calculateQuote(@Valid @RequestBody QuoteRequestDTO request) {
        QuoteResponseDTO quote = checkoutService.calculateQuote(request);
        return ResponseEntity.ok(quote);
    }

    @PostMapping("/orders")
    public ResponseEntity<OrderResponseDTO> placeOrder(
            @Valid @RequestBody PlaceOrderRequestDTO request,
            Authentication authentication) {
        String userEmail = authentication.getName();
        OrderResponseDTO order = checkoutService.placeOrder(request, userEmail);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/orders/me")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(Authentication authentication) {
        String userEmail = authentication.getName();
        List<OrderResponseDTO> orders = checkoutService.getMyOrders(userEmail);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<OrderResponseDTO> getOrder(
            @PathVariable UUID orderId,
            Authentication authentication) {
        String userEmail = authentication.getName();
        OrderResponseDTO order = checkoutService.getOrder(orderId, userEmail);
        return ResponseEntity.ok(order);
    }
}
