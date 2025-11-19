package urbantitan.code.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDTO {

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;

    @NotBlank(message = "Slug is required")
    @Size(min = 2, max = 255, message = "Slug must be between 2 and 255 characters")
    @Pattern(
        regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
        message = "Slug must contain only lowercase letters, numbers, and hyphens"
    )
    private String slug;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1024, message = "Description must be between 10 and 1024 characters")
    private String description;

    @NotNull(message = "Base price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Base price must be greater than 0")
    private BigDecimal basePrice;

    @NotNull(message = "Brand ID is required")
    private UUID brandId;

    @NotNull(message = "Category ID is required")
    private UUID categoryId;

    @NotNull(message = "isActive flag is required")
    private Boolean isActive = true;

    @Pattern(
        regexp = "^(https?|ftp)://.*$",
        message = "Primary image URL must be a valid URL"
    )
    @Size(max = 255, message = "Image URL cannot exceed 255 characters")
    private String primaryImageUrl;
}