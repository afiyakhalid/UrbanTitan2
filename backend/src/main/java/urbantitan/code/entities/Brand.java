package urbantitan.code.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.UUID;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@ToString
@Entity
@Setter
@Getter
@Table( 
    name = "brands" , 
    indexes = { 
        @Index( name = "idx_brands_slug" , columnList = "slug" ) 
    }
)
public class Brand {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "slug", nullable = false, length = 255)
    private String slug;

    @Column(name = "description", nullable = false, length = 1024)
    private String description;

    @Column(name = "logo_url", length = 255)
    private String logoUrl;

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @Column(name = "website_url", length = 255)
    private String websiteUrl;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}