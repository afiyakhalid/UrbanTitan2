package urbantitan.code.entities;

import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
    name = "order_items",
    indexes = {
        @Index(name = "orderItemsOrderIdx", columnList = "order_id"),
        @Index(name = "orderItemsProductIdx", columnList = "product_id"),
        @Index(name = "orderItemsQuotationIdx", columnList = "quotation_id")
    }
)
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID orderItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_orderitem_order"))
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_orderitem_product"))
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id",
        foreignKey = @ForeignKey(name = "fk_orderitem_quotation"))
    private DealerQuotation quotation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dealer_user_id",
        foreignKey = @ForeignKey(name = "fk_orderitem_dealer"))
    private User dealer;

    @Column(name = "product_name", length = 255, nullable = false)
    private String productName;

    @Column(name = "dealer_name", length = 255)
    private String dealerName;

    @Column(name = "dealer_email", length = 255)
    private String dealerEmail;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", precision = 12, scale = 2, nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "mrp", precision = 12, scale = 2)
    private BigDecimal mrp;

    @Column(name = "discount_amount", precision = 12, scale = 2)
    private BigDecimal discountAmount;

    @Column(name = "total_price", precision = 12, scale = 2, nullable = false)
    private BigDecimal totalPrice;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}