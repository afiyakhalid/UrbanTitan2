package urbantitan.code.repositories;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.EmailOtpChallenge;

@Repository
public interface EmailOtpChallengeRepository extends JpaRepository<EmailOtpChallenge, UUID> {
    Optional<EmailOtpChallenge> findTopByEmailOrderByCreatedAtDesc(String email);
    void deleteByEmail(String email);
}
