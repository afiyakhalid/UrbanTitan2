package urbantitan.code.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private OffsetDateTime emailVerified;
    
    @Pattern(
        regexp = "^(https?|ftp)://.*$",
        message = "Image must be a valid URL"
    )
    private String image;

    @NotBlank(message = "Role is required")
    @Pattern(
        regexp = "^(ADMIN|MANUFACTURER|USER)$",
        message = "Role must be one of: ADMIN, MANUFACTURER, USER"
    )
    private String role;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;
}