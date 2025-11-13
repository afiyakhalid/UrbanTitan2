package urbantitan.code.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class Seller {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String companyName;
    private String gstNumber;
    private String address;

    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;

    private String documentsUrl;
    private LocalDateTime verifiedAt;

    public enum KycStatus {
        PENDING, VERIFIED, REJECTED
    }
}
