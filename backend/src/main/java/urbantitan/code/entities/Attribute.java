package urbantitan.code.entities;

import lombok.Getter;
import lombok.Setter;
import java.util.UUID;
import lombok.ToString;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@ToString
@Entity
@Setter
@Getter
@Table(
    name = "attributes",
    indexes = {
        @Index(name = "attributesNameIdx", columnList = "name", unique = true),
        @Index(name = "attributesSlugIdx", columnList = "slug", unique = true)
    }
)
public class Attribute {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "slug", nullable = false, length = 255, unique = true)
    private String slug;

    @Column(name = "description", nullable = false, length = 1024)
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}