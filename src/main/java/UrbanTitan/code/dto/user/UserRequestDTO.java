package urbantitan.code.dto.user;

import java.time.OffsetDateTime;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {
    
    private String name;
    private String email;
    private OffsetDateTime emailVerified;
    private String image;
    private String role;
}