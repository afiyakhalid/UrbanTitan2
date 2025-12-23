package urbantitan.code.services;

import urbantitan.code.dto.onboarding.SellerOnboardingRequestDTO;
import urbantitan.code.dto.onboarding.SellerOnboardingResponseDTO;

public interface SellerOnboardingService {

    SellerOnboardingResponseDTO submitRequest(
            SellerOnboardingRequestDTO dto,
            String userEmail
    );

    SellerOnboardingResponseDTO getMyRequest(String userEmail);
}
