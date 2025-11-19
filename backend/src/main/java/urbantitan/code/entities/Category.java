package urbantitan.code.entities;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

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
public class Category {
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

    @Column(name = "is_active")
    private String isActive;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();
}