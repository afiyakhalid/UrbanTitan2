package urbantitan.code.repositories;

import java.util.Optional;
import java.util.UUID;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    Optional<Product> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Product> findByIsActive(Boolean isActive);
    List<Product> findByCategoryId(UUID categoryId);
    List<Product> findByCategoryIdAndIsActiveTrue(UUID categoryId);
    List<Product> findByBrandId(UUID brandId);

    @Query("SELECT p FROM Product p " +
            "WHERE lower(p.name) LIKE concat('%', :q, '%') " +
            "   OR lower(p.slug) LIKE concat('%', :q, '%') " +
            "ORDER BY p.isActive DESC, p.createdAt DESC")
    List<Product> findSearchCandidates(@Param("q") String q, org.springframework.data.domain.Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "WHERE (p.isActive = TRUE OR p.isActive IS NULL) " +
            "ORDER BY p.isActive DESC, p.createdAt DESC")
    List<Product> findFallbackCandidates(org.springframework.data.domain.Pageable pageable);

    default List<Product> findSearchCandidates(String q, int limit) {
        return findSearchCandidates(q, org.springframework.data.domain.PageRequest.of(0, limit));
    }

    default List<Product> findFallbackCandidates(int limit) {
        return findFallbackCandidates(org.springframework.data.domain.PageRequest.of(0, limit));
    }
}