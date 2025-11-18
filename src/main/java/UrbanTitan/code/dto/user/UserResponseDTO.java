package urbantitan.code.dto.user;

import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.UUID;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    
    private UUID id;
    private String name;
    private String email;
    private OffsetDateTime emailVerified;
    private String image;
    private OffsetDateTime createdAt;
    private String role;
}