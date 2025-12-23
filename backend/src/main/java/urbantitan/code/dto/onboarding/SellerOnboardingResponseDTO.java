package urbantitan.code.dto.onboarding;

import lombok.Getter;
import lombok.Setter;
import urbantitan.code.enums.ROLES;

import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
public class SellerOnboardingResponseDTO {

    private UUID id;
    private ROLES requestedRole;
    private String status;
    private OffsetDateTime createdAt;
}
