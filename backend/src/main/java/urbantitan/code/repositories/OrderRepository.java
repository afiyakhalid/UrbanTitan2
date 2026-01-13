package urbantitan.code.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import urbantitan.code.entities.Order;
import urbantitan.code.enums.OrderStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    Optional<Order> findByOrderNumber(String orderNumber);

    Optional<Order> findByOrderIdAndUserId(UUID orderId, UUID userId);

    Page<Order> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

    List<Order> findByUserIdAndStatusOrderByCreatedAtDesc(UUID userId, OrderStatus status);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.orderId = :orderId")
    Optional<Order> findByIdWithItems(@Param("orderId") UUID orderId);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.orderId = :orderId AND o.user.id = :userId")
    Optional<Order> findByIdAndUserIdWithItems(@Param("orderId") UUID orderId, @Param("userId") UUID userId);
}
