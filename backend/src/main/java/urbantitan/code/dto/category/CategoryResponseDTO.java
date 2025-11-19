package urbantitan.code.dto.category;

import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class CategoryResponseDTO {

    private UUID id;
    private String name;
    private String slug;
    private String description;
    private String isActive;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}