package urbantitan.code.repositories;

import java.util.Optional;
import java.util.UUID;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import urbantitan.code.repositories.search.TrigramSearchRow;

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

    @Query(value = """
            SELECT
              p.name AS label,
              p.slug AS slug,
              GREATEST(similarity(lower(p.name), :q), similarity(lower(p.slug), :q)) AS score
            FROM product p
            WHERE GREATEST(similarity(lower(p.name), :q), similarity(lower(p.slug), :q)) >= :minScore
            ORDER BY score DESC
            LIMIT :limit
            """, nativeQuery = true)
    List<TrigramSearchRow> suggestByTrigram(
            @Param("q") String q,
            @Param("minScore") double minScore,
            @Param("limit") int limit
    );

    default List<Product> findSearchCandidates(String q, int limit) {
        return findSearchCandidates(q, org.springframework.data.domain.PageRequest.of(0, limit));
    }

    default List<Product> findFallbackCandidates(int limit) {
        return findFallbackCandidates(org.springframework.data.domain.PageRequest.of(0, limit));
    }
}