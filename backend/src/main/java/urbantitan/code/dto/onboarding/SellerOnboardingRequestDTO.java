package urbantitan.code.dto.onboarding;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import urbantitan.code.enums.BusinessModel;
import urbantitan.code.enums.ROLES;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerOnboardingRequestDTO {

    @NotNull
    private ROLES requestedRole; // MANUFACTURER / DEALER / DISTRIBUTOR / AUTHORISED_DISTRIBUTOR

    @NotBlank
    private String materialType;

    @NotBlank
    private String companyName;

    @NotBlank
    private String gstin;

    @NotBlank
    private String officeLocation;

    private String description;

    @NotNull
    private BusinessModel businessModel;

}
