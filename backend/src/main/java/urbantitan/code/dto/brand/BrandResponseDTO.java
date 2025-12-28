package urbantitan.code.dto.brand;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandResponseDTO {

    private UUID id;
    private String name;
    private String slug;
    private String description;
    private String logoUrl;
    private String imageUrl;
    private String websiteUrl;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}