package urbantitan.code.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import urbantitan.code.enums.BusinessModel;
import urbantitan.code.enums.ROLES;
import urbantitan.code.enums.Status;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "seller_onboarding_requests")
@Getter
@Setter
public class SellerOnboardingRequest {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(optional = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private ROLES requestedRole;

    @Enumerated(EnumType.STRING)
    private BusinessModel businessModel;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private String adminRemark;

    @CreationTimestamp
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    private OffsetDateTime updatedAt;
}
