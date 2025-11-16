package urbantitan.code.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(
    name = "product_attributes",
    uniqueConstraints = {
        @UniqueConstraint(name = "productAttributesProdAttrIdx", columnNames = {"product_id", "attribute_id"})
    },
    indexes = {
        @Index(name = "productAttributesProdIdIdx", columnList = "product_id"),
        @Index(name = "productAttributesAttrIdIdx", columnList = "attribute_id")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttribute {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productAttributeId;

    @ManyToOne
    @JoinColumn(
        name = "product_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_productattribute_product")
    )
    private Product product;

    @ManyToOne
    @JoinColumn(
        name = "attribute_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_productattribute_attribute")
    )
    private Attribute attribute;

    @Column(name = "is_required", nullable = false)
    private boolean isRequired = false;

    @Column(name = "display_order")
    private Integer displayOrder;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}
