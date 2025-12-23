package urbantitan.code.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urbantitan.code.enums.BusinessModel;
import urbantitan.code.enums.ROLES;
import urbantitan.code.enums.Status;
import urbantitan.code.dto.onboarding.SellerOnboardingRequestDTO;
import urbantitan.code.dto.onboarding.SellerOnboardingResponseDTO;
import urbantitan.code.entities.SellerOnboardingRequest;
import urbantitan.code.entities.User;
import urbantitan.code.repositories.SellerOnboardingRequestRepository;
import urbantitan.code.repositories.UserRepository;
import urbantitan.code.services.SellerOnboardingService;

@Service
@RequiredArgsConstructor
@Transactional
public class SellerOnboardingServiceImpl implements SellerOnboardingService {

    private final SellerOnboardingRequestRepository onboardingRequestRepository;
    private final UserRepository userRepository;

    @Override
    public SellerOnboardingResponseDTO submitRequest(
            SellerOnboardingRequestDTO dto,
            String userEmail
    ) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new IllegalStateException("User not found for email: " + userEmail)
                );

        // Prevent duplicate active requests
        onboardingRequestRepository
                .findByUserAndStatus(user, Status.PENDING)
                .ifPresent(req -> {
                    throw new IllegalStateException(
                            "An onboarding request is already pending"
                    );
                });

        SellerOnboardingRequest request = new SellerOnboardingRequest();
        request.setUser(user);
        request.setRequestedRole(ROLES.SELLER);
        request.setBusinessModel(
                BusinessModel.valueOf(String.valueOf(dto.getBusinessModel()))
        );
        request.setStatus(Status.PENDING);

        onboardingRequestRepository.save(request);

        return mapToResponse(request);
    }

    @Override
    public SellerOnboardingResponseDTO getMyRequest(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new IllegalStateException("User not found for email: " + userEmail)
                );

        SellerOnboardingRequest request =
                onboardingRequestRepository.findTopByUserOrderByCreatedAtDesc(user)
                        .orElseThrow(() ->
                                new IllegalStateException("No onboarding request found")
                        );

        return mapToResponse(request);
    }

    private SellerOnboardingResponseDTO mapToResponse(
            SellerOnboardingRequest request
    ) {
        SellerOnboardingResponseDTO dto = new SellerOnboardingResponseDTO();
        dto.setId(request.getId());
        dto.setRequestedRole(request.getRequestedRole());
        dto.setStatus(request.getStatus().name());
        dto.setCreatedAt(request.getCreatedAt());
        return dto;
    }
}
