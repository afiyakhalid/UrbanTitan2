package urbantitan.code.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, UUID> {

    Optional<Brand> findBySlug(String slug);
    boolean existsBySlug(String slug);
    boolean existsByName(String name);

    @Query("SELECT b FROM Brand b WHERE lower(b.name) LIKE concat('%', :q, '%') OR lower(b.slug) LIKE concat('%', :q, '%')")
    List<Brand> findSearchCandidates(@Param("q") String q, Pageable pageable);

    default List<Brand> findSearchCandidates(String q, int limit) {
        return findSearchCandidates(q, org.springframework.data.domain.PageRequest.of(0, limit));
    }
}