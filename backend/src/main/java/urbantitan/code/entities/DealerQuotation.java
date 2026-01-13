package urbantitan.code.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    name = "dealer_quotations",
    indexes = {
        @Index(name = "dealerQuotationsProductIdx", columnList = "product_id"),
        @Index(name = "dealerQuotationsDealerIdx", columnList = "dealer_user_id"),
        @Index(name = "dealerQuotationsActiveIdx", columnList = "is_active")
    }
)
public class DealerQuotation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_dealerquotation_product"))
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dealer_user_id", nullable = false,
        foreignKey = @ForeignKey(name = "fk_dealerquotation_user"))
    private User dealer;

    @Column(name = "unit_price", precision = 12, scale = 2, nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "mrp", precision = 12, scale = 2)
    private BigDecimal mrp;

    @Column(name = "discount_percent", precision = 5, scale = 2)
    private BigDecimal discountPercent;

    @Column(name = "min_order_qty")
    private Integer minOrderQty;

    @Column(name = "lead_time_days")
    private Integer leadTimeDays;

    @Column(name = "stock_available")
    private Integer stockAvailable;

    @Column(name = "notes", length = 500)
    private String notes;

    @Column(name = "services_offered", length = 500)
    private String servicesOffered;

    @Column(name = "valid_until")
    private OffsetDateTime validUntil;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}
