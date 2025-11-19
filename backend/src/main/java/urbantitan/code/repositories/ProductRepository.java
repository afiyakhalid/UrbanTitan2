package urbantitan.code.repositories;

import java.util.Optional;
import java.util.UUID;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    Optional<Product> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Product> findByIsActive(Boolean isActive);
    List<Product> findByCategoryId(UUID categoryId);
    List<Product> findByBrandId(UUID brandId);
}