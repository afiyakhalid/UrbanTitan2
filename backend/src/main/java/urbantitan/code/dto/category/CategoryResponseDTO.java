package urbantitan.code.dto.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseDTO {

    private UUID id;
    private String name;
    private String slug;
    private String description;
    private Boolean isActive;
    @JsonProperty("parent_id")
    private UUID parent_id;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}