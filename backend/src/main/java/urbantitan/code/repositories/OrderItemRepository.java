package urbantitan.code.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.OrderItem;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {

    List<OrderItem> findByOrderOrderId(UUID orderId);

    @Query("SELECT oi FROM OrderItem oi WHERE oi.dealer.id = :dealerId ORDER BY oi.createdAt DESC")
    List<OrderItem> findByDealerId(@Param("dealerId") UUID dealerId);

    @Query("SELECT DISTINCT oi.dealerEmail FROM OrderItem oi WHERE oi.order.orderId = :orderId AND oi.dealerEmail IS NOT NULL")
    List<String> findDealerEmailsByOrderId(@Param("orderId") UUID orderId);
}
