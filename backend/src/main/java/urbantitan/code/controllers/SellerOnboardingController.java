package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import urbantitan.code.dto.onboarding.SellerOnboardingRequestDTO;
import urbantitan.code.dto.onboarding.SellerOnboardingResponseDTO;
import urbantitan.code.services.SellerOnboardingService;

@RestController
@RequestMapping("/api/seller/onboarding")
@RequiredArgsConstructor
public class SellerOnboardingController {

    private final SellerOnboardingService sellerOnboardingService;

    /**
     * Submit seller onboarding request
     */
    @PostMapping
    public ResponseEntity<SellerOnboardingResponseDTO> submitOnboardingRequest(
            @RequestBody SellerOnboardingRequestDTO requestDTO,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();

        SellerOnboardingResponseDTO response =
                sellerOnboardingService.submitRequest(requestDTO, userEmail);

        return ResponseEntity.ok(response);
    }

    /**
     * Get latest onboarding request of logged-in user
     */
    @GetMapping("/me")
    public ResponseEntity<SellerOnboardingResponseDTO> getMyOnboardingRequest(
            Authentication authentication
    ) {
        String userEmail = authentication.getName();

        SellerOnboardingResponseDTO response =
                sellerOnboardingService.getMyRequest(userEmail);

        return ResponseEntity.ok(response);
    }
}
