package urbantitan.code.dto.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CategoryRequestDTO {

    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;

    @NotBlank(message = "Slug is required")
    @Size(min = 2, max = 255, message = "Slug must be between 2 and 255 characters")
    private String slug;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1024, message = "Description must be between 10 and 1024 characters")
    private String description;

    private Boolean isActive = Boolean.TRUE;
}