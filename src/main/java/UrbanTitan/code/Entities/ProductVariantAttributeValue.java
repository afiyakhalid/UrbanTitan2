package urbantitan.code.entities;

import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.OffsetDateTime;

@Entity
@Table(
    name = "product_variant_attribute_values",
    indexes = {
        @Index(name = "pvavVariantIdIdx", columnList = "product_variant_id"),
        @Index(name = "pvavValueIdIdx", columnList = "product_attribute_value_id")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantAttributeValue {

    @EmbeddedId
    private ProductVariantAttributeValueId id;

    @ManyToOne
    @MapsId("productVariantId")
    @JoinColumn(
        name = "product_variant_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_pvav_productVariant")
    )
    private ProductVariant productVariant;

    @ManyToOne
    @MapsId("productAttributeValueId")
    @JoinColumn(
        name = "product_attribute_value_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_pvav_productAttributeValue")
    )
    private ProductAttributeValue productAttributeValue;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}