package urbantitan.code.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Setter
@Getter
@Table(
    name = "product",
    indexes = {
        @Index(name = "productsSlugIdx", columnList = "slug", unique = true),
        @Index(name = "productsBrandIdIdx", columnList = "brand_id"),
        @Index(name = "productsCategoryIdIdx", columnList = "category_id"),
        @Index(name = "productsIsActiveIdx", columnList = "is_active")
    }
)
@NoArgsConstructor
public class Product {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "slug", nullable = false, length = 255, unique = true)
    private String slug;

    @Column(name = "description", nullable = false, length = 1024)
    private String description;

    @Column(name = "volume", length = 100)
    private String volume;

    @Column(name = "product_code", length = 50)
    private String productCode;

    @Column(name = "base_price", nullable = false)
    private BigDecimal basePrice;

    @Column(name = "mrp")
    private BigDecimal mrp;

    @Column(name = "coupon_offer")
    private Integer couponOffer;

    @Column(name = "treats_points")
    private Integer treatsPoints;

    @Column(name = "rating", precision = 3, scale = 2)
    private BigDecimal rating;

    @Column(name = "review_count")
    private Integer reviewCount;

    @Column(name = "delivery_date", length = 100)
    private String deliveryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false, foreignKey = @ForeignKey(name = "fk_product_brand"))
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_product_category"))
    private Category category;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = Boolean.TRUE;

    @Column(name = "primary_image_url")
    private String primaryImageUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}