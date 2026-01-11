package urbantitan.code.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import urbantitan.code.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Optional<Category> findBySlug(String slug);
    boolean existsBySlug(String slug);
    boolean existsByName(String name);

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.parent")
    List<Category> findAllWithParent();

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.parent WHERE c.id = :id")
    Optional<Category> findByIdWithParent(UUID id);

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.parent WHERE c.slug = :slug")
    Optional<Category> findBySlugWithParent(String slug);

    @Query("SELECT c FROM Category c WHERE lower(c.name) LIKE concat('%', :q, '%') OR lower(c.slug) LIKE concat('%', :q, '%')")
    List<Category> findSearchCandidates(@Param("q") String q, Pageable pageable);

    default List<Category> findSearchCandidates(String q, int limit) {
        return findSearchCandidates(q, org.springframework.data.domain.PageRequest.of(0, limit));
    }
}
