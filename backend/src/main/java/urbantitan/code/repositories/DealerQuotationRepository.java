package urbantitan.code.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.DealerQuotation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DealerQuotationRepository extends JpaRepository<DealerQuotation, UUID> {

    List<DealerQuotation> findByProductIdAndIsActiveTrueOrderByUnitPriceAsc(UUID productId);

    List<DealerQuotation> findByDealerIdAndIsActiveTrue(UUID dealerId);

    Optional<DealerQuotation> findByIdAndIsActiveTrue(UUID id);

    @Query("SELECT dq FROM DealerQuotation dq WHERE dq.product.id = :productId AND dq.isActive = true ORDER BY dq.unitPrice ASC")
    List<DealerQuotation> findActiveQuotationsForProduct(@Param("productId") UUID productId);

    @Query("SELECT dq FROM DealerQuotation dq WHERE dq.product.id IN :productIds AND dq.isActive = true ORDER BY dq.product.id, dq.unitPrice ASC")
    List<DealerQuotation> findActiveQuotationsForProducts(@Param("productIds") List<UUID> productIds);
}
