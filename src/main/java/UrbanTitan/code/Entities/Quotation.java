package urbantitan.code.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotations")
public class Quotation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "customer_id")
    private User customer;

    @ManyToOne @JoinColumn(name = "seller_id")
    private Seller seller;

    @ManyToOne @JoinColumn(name = "product_id")
    private Product product;

    private Integer requestedQuantity;
    private Double quotedPrice;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        REQUESTED, QUOTED, ACCEPTED, REJECTED
    }

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

