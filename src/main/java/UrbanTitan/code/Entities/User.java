package urbantitan.code.entities;

import java.time.OffsetDateTime;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(name = "user_email_unique", columnNames = "email")
})
public class User {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;
    private OffsetDateTime emailVerified;
    private String image;

    @Column(nullable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.CLIENT;

    public enum Role { ADMIN, MANUFACTURER, CLIENT }
}