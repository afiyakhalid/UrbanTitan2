package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urbantitan.code.dto.checkout.*;
import urbantitan.code.entities.*;
import urbantitan.code.enums.OrderStatus;
import urbantitan.code.enums.PaymentStatus;
import urbantitan.code.repositories.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CheckoutService {

    private static final Logger log = LoggerFactory.getLogger(CheckoutService.class);
    private static final BigDecimal DEFAULT_DELIVERY_FEE = new BigDecimal("45.00");
    private static final BigDecimal FREE_DELIVERY_THRESHOLD = new BigDecimal("500.00");

    private final ProductRepository productRepository;
    private final DealerQuotationRepository quotationRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderNotificationService notificationService;

    public QuoteResponseDTO calculateQuote(QuoteRequestDTO request) {
        List<QuoteResponseDTO.QuoteLineItemDTO> lineItems = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal discountTotal = BigDecimal.ZERO;

        for (CartItemDTO cartItem : request.getItems()) {
            UUID productId = UUID.fromString(cartItem.getProductId());
            Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + cartItem.getProductId()));

            BigDecimal unitPrice;
            BigDecimal mrp;
            String quotationId = null;
            String dealerName = null;
            String dealerId = null;

            if (cartItem.getQuotationId() != null && !cartItem.getQuotationId().isBlank()) {
                DealerQuotation quotation = quotationRepository.findByIdAndIsActiveTrue(UUID.fromString(cartItem.getQuotationId()))
                    .orElseThrow(() -> new IllegalArgumentException("Quotation not found or inactive: " + cartItem.getQuotationId()));
                unitPrice = quotation.getUnitPrice();
                mrp = quotation.getMrp() != null ? quotation.getMrp() : product.getMrp();
                quotationId = quotation.getId().toString();
                dealerName = quotation.getDealer().getName();
                dealerId = quotation.getDealer().getId().toString();
            } else {
                List<DealerQuotation> quotations = quotationRepository.findActiveQuotationsForProduct(productId);
                if (!quotations.isEmpty()) {
                    DealerQuotation bestQuotation = quotations.get(0);
                    unitPrice = bestQuotation.getUnitPrice();
                    mrp = bestQuotation.getMrp() != null ? bestQuotation.getMrp() : product.getMrp();
                    quotationId = bestQuotation.getId().toString();
                    dealerName = bestQuotation.getDealer().getName();
                    dealerId = bestQuotation.getDealer().getId().toString();
                } else {
                    unitPrice = product.getBasePrice();
                    mrp = product.getMrp();
                }
            }

            if (mrp == null) {
                mrp = unitPrice;
            }

            BigDecimal lineDiscount = mrp.subtract(unitPrice).multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            if (lineDiscount.compareTo(BigDecimal.ZERO) < 0) {
                lineDiscount = BigDecimal.ZERO;
            }
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            subtotal = subtotal.add(lineTotal);
            discountTotal = discountTotal.add(lineDiscount);

            lineItems.add(QuoteResponseDTO.QuoteLineItemDTO.builder()
                .productId(product.getId().toString())
                .productName(product.getName())
                .brandName(product.getBrand() != null ? product.getBrand().getName() : null)
                .productImage(product.getPrimaryImageUrl())
                .quantity(cartItem.getQuantity())
                .unitPrice(unitPrice.setScale(2, RoundingMode.HALF_UP))
                .mrp(mrp.setScale(2, RoundingMode.HALF_UP))
                .discountAmount(lineDiscount.setScale(2, RoundingMode.HALF_UP))
                .lineTotal(lineTotal.setScale(2, RoundingMode.HALF_UP))
                .quotationId(quotationId)
                .dealerName(dealerName)
                .dealerId(dealerId)
                .build());
        }

        BigDecimal deliveryFee = subtotal.compareTo(FREE_DELIVERY_THRESHOLD) >= 0 
            ? BigDecimal.ZERO 
            : DEFAULT_DELIVERY_FEE;
        BigDecimal grandTotal = subtotal.add(deliveryFee);

        String estimatedDelivery = OffsetDateTime.now().plusDays(5)
            .format(DateTimeFormatter.ofPattern("dd MMM yyyy"));

        return QuoteResponseDTO.builder()
            .currency("INR")
            .lineItems(lineItems)
            .subtotal(subtotal.setScale(2, RoundingMode.HALF_UP))
            .discountTotal(discountTotal.setScale(2, RoundingMode.HALF_UP))
            .deliveryFee(deliveryFee.setScale(2, RoundingMode.HALF_UP))
            .grandTotal(grandTotal.setScale(2, RoundingMode.HALF_UP))
            .estimatedDelivery(estimatedDelivery)
            .build();
    }

    @Transactional
    public OrderResponseDTO placeOrder(PlaceOrderRequestDTO request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        QuoteRequestDTO quoteRequest = QuoteRequestDTO.builder()
            .items(request.getItems())
            .pincode(request.getShippingAddress().getPincode())
            .build();
        QuoteResponseDTO quote = calculateQuote(quoteRequest);

        String orderNumber = generateOrderNumber();

        Order order = Order.builder()
            .orderNumber(orderNumber)
            .user(user)
            .subtotal(quote.getSubtotal())
            .discountAmount(quote.getDiscountTotal())
            .deliveryFee(quote.getDeliveryFee())
            .totalAmount(quote.getGrandTotal())
            .status(OrderStatus.PENDING)
            .paymentMethod(request.getPaymentMethod())
            .paymentStatus(request.getPaymentMethod() == urbantitan.code.enums.PaymentMethod.COD 
                ? PaymentStatus.NOT_REQUIRED 
                : PaymentStatus.PENDING)
            .shippingName(request.getShippingAddress().getName())
            .shippingPhone(request.getShippingAddress().getPhone())
            .shippingAddressLine1(request.getShippingAddress().getAddressLine1())
            .shippingAddressLine2(request.getShippingAddress().getAddressLine2())
            .shippingCity(request.getShippingAddress().getCity())
            .shippingState(request.getShippingAddress().getState())
            .shippingPincode(request.getShippingAddress().getPincode())
            .customerNotes(request.getCustomerNotes())
            .orderItems(new ArrayList<>())
            .build();

        if (!request.isBillingAddressSameAsShipping() && request.getBillingAddress() != null) {
            AddressDTO billing = request.getBillingAddress();
            order.setBillingAddress(String.format("%s, %s, %s, %s, %s - %s",
                billing.getName(), billing.getAddressLine1(),
                billing.getAddressLine2() != null ? billing.getAddressLine2() : "",
                billing.getCity(), billing.getState(), billing.getPincode()));
        }

        for (QuoteResponseDTO.QuoteLineItemDTO lineItem : quote.getLineItems()) {
            Product product = productRepository.findById(UUID.fromString(lineItem.getProductId()))
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

            DealerQuotation quotation = null;
            User dealer = null;
            String dealerEmail = null;
            String dealerName = null;

            if (lineItem.getQuotationId() != null) {
                quotation = quotationRepository.findById(UUID.fromString(lineItem.getQuotationId())).orElse(null);
                if (quotation != null) {
                    dealer = quotation.getDealer();
                    dealerEmail = dealer.getEmail();
                    dealerName = dealer.getName();
                }
            }

            OrderItem orderItem = OrderItem.builder()
                .order(order)
                .product(product)
                .quotation(quotation)
                .dealer(dealer)
                .productName(lineItem.getProductName())
                .dealerName(dealerName)
                .dealerEmail(dealerEmail)
                .quantity(lineItem.getQuantity())
                .unitPrice(lineItem.getUnitPrice())
                .mrp(lineItem.getMrp())
                .discountAmount(lineItem.getDiscountAmount())
                .totalPrice(lineItem.getLineTotal())
                .build();

            order.getOrderItems().add(orderItem);
        }

        Order savedOrder = orderRepository.save(order);

        try {
            notificationService.notifyDealersForOrder(savedOrder);
            notificationService.sendOrderConfirmationToCustomer(savedOrder, user.getEmail());
        } catch (Exception ex) {
            log.error("Failed to send notifications for order {}", savedOrder.getOrderNumber(), ex);
        }

        return mapToOrderResponse(savedOrder);
    }

    public OrderResponseDTO getOrder(UUID orderId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Order order = orderRepository.findByIdAndUserIdWithItems(orderId, user.getId())
            .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        return mapToOrderResponse(order);
    }

    public List<OrderResponseDTO> getMyOrders(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId(), 
                org.springframework.data.domain.PageRequest.of(0, 50))
            .stream()
            .map(this::mapToOrderResponse)
            .toList();
    }

    private OrderResponseDTO mapToOrderResponse(Order order) {
        List<OrderResponseDTO.OrderItemResponseDTO> items = order.getOrderItems().stream()
            .map(item -> OrderResponseDTO.OrderItemResponseDTO.builder()
                .productId(item.getProduct().getId().toString())
                .productName(item.getProductName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .mrp(item.getMrp())
                .discountAmount(item.getDiscountAmount())
                .totalPrice(item.getTotalPrice())
                .dealerName(item.getDealerName())
                .build())
            .toList();

        AddressDTO shippingAddress = AddressDTO.builder()
            .name(order.getShippingName())
            .phone(order.getShippingPhone())
            .addressLine1(order.getShippingAddressLine1())
            .addressLine2(order.getShippingAddressLine2())
            .city(order.getShippingCity())
            .state(order.getShippingState())
            .pincode(order.getShippingPincode())
            .build();

        return OrderResponseDTO.builder()
            .orderId(order.getOrderId().toString())
            .orderNumber(order.getOrderNumber())
            .status(order.getStatus())
            .paymentMethod(order.getPaymentMethod())
            .paymentStatus(order.getPaymentStatus())
            .subtotal(order.getSubtotal())
            .discountAmount(order.getDiscountAmount())
            .deliveryFee(order.getDeliveryFee())
            .totalAmount(order.getTotalAmount())
            .shippingAddress(shippingAddress)
            .customerNotes(order.getCustomerNotes())
            .items(items)
            .createdAt(order.getCreatedAt())
            .build();
    }

    private String generateOrderNumber() {
        return "UT" + System.currentTimeMillis() + String.format("%04d", new Random().nextInt(10000));
    }
}
