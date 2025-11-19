package urbantitan.code.entities;

import lombok.*;
import java.util.UUID;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(
    name = "product_attribute_values",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "productAttrValuesProdAttrValIdx",
            columnNames = {"product_attribute_id", "attribute_value_id"}
        )
    },
    indexes = {
        @Index(name = "productAttrValuesProdAttrIdIdx", columnList = "product_attribute_id"),
        @Index(name = "productAttrValuesAttrValIdIdx", columnList = "attribute_value_id")
    }
)
public class ProductAttributeValue {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productAttributeValueId;

    @ManyToOne
    @JoinColumn(
        name = "product_attribute_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_productattributevalue_productattribute")
    )
    private ProductAttribute productAttribute;

    @ManyToOne
    @JoinColumn(
        name = "attribute_value_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_productattributevalue_attributevalue")
    )
    private AttributeValue attributeValue;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}