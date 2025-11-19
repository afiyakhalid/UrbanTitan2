package urbantitan.code.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.OffsetDateTime;
import jakarta.persistence.*;

@ToString
@Entity
@Setter
@Getter
@Table( 
    name = "brand_category" , 
    indexes = {
        @Index(name = "idx_brand_category_brand", columnList = "brand_id"),
        @Index(name = "idx_brand_category_category", columnList = "category_id")
    }
)
public class BrandCategory {
    @EmbeddedId
    private BrandCategoryId id;

    @ManyToOne
    @MapsId("brandId")
    @JoinColumn(name = "brand_id", nullable = false, foreignKey = @ForeignKey(name = "fk_brandcategory_brand"))
    private Brand brand;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_brandcategory_category"))
    private Category category;

    @Column(name = "brand_category_name")
    private String brandCategoryName;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();
}