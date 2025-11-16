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
    name = "categories" , 
    indexes = { 
        @Index( name = "idx_categories_slug" , columnList = "slug" ) 
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