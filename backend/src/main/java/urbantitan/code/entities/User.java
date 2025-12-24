package urbantitan.code.entities;

import java.time.OffsetDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import urbantitan.code.enums.ROLES;
import urbantitan.code.enums.Status;

import java.util.UUID;

@Entity
@Setter
@Getter
@Table( name = "users" )
public class User {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "email_verified")
    private OffsetDateTime emailVerified;

    @Column(unique = true)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private ROLES role = ROLES.USER;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "password", nullable = true, length = 255)
    private String password;
}