package urbantitan.code.dto.brand;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandRequestDTO {

    @NotBlank
    @Size(min = 2, max = 255)
    private String name;

    @NotBlank
    @Size(min = 2, max = 255)
    @Pattern(
        regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
        message = "Slug must contain only lowercase letters, numbers, and hyphens"
    )
    private String slug;

    @NotBlank
    @Size(min = 10, max = 1024)
    private String description;

    @Pattern(regexp = "^(https?|ftp)://.*$", message = "Logo must be a valid URL")
    private String logoUrl;

    @Pattern(regexp = "^(https?|ftp)://.*$", message = "Website URL must be a valid URL")
    private String websiteUrl;
}