package urbantitan.code.dto.brand;

import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class BrandResponseDTO {

    private UUID id;
    private String name;
    private String slug;
    private String description;
    private String logoUrl;
    private String websiteUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}