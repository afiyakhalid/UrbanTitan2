package urbantitan.code.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@ToString
@Entity
@Setter
@Getter
@Table(
    name = "attribute_values",
    uniqueConstraints = {
        @UniqueConstraint(name = "attributeValuesAttrIdValueIdx", columnNames = {"attribute_id", "attribute_value"})
    },
    indexes = {
        @Index(name = "attributeValuesAttrIdIdx", columnList = "attribute_id"),
        @Index(name = "attributeValuesSlugIdx", columnList = "slug")
    }
)
public class AttributeValue {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "attribute_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_attributevalue_attribute")
    )
    private Attribute attribute;

    @Column(name = "attribute_value", nullable = false)
    private String value;
    
    @Column(name = "slug", length = 255)
    private String slug;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}