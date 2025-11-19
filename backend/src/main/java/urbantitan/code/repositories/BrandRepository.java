package urbantitan.code.repositories;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, UUID> {

    Optional<Brand> findBySlug(String slug);
    boolean existsBySlug(String slug);
    boolean existsByName(String name);
}