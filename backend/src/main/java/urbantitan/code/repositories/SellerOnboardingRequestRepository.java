package urbantitan.code.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import urbantitan.code.enums.Status;
import urbantitan.code.entities.SellerOnboardingRequest;
import urbantitan.code.entities.User;

import java.util.Optional;
import java.util.UUID;

public interface SellerOnboardingRequestRepository
        extends JpaRepository<SellerOnboardingRequest, UUID> {

    Optional<SellerOnboardingRequest> findByUserAndStatus(
            User user,
            Status status
    );

    Optional<SellerOnboardingRequest> findTopByUserOrderByCreatedAtDesc(
            User user
    );
}
