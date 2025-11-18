package urbantitan.code.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import urbantitan.code.entities.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(User.Role role);
    boolean existsByEmail(String email);
}