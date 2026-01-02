package urbantitan.code.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import org.springframework.stereotype.Service;
import urbantitan.code.entities.User;
import urbantitan.code.enums.ROLES;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtService {

    private final SecretKey signingKey;
    private final String issuer;
    private final long expiryMillis;
    private final JwtParser parser;

    public JwtService(
            @Value("${security.jwt.secret:${JWT_SECRET:}}") String secret,
            @Value("${security.jwt.issuer:urbantitan}") String issuer,
            @Value("${security.jwt.expiry-seconds:604800}") long expirySeconds
    ) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("JWT secret is not configured (security.jwt.secret / JWT_SECRET)");
        }
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.issuer = issuer;
        this.expiryMillis = Math.max(1, expirySeconds) * 1000L;
        this.parser = Jwts.parser()
                .requireIssuer(this.issuer)
                .verifyWith(this.signingKey)
                .build();
    }

    public String generateToken(User user) {
        UUID userId = user.getId();
        ROLES role = user.getRole();
        String name = user.getName();
        if (userId == null) {
            throw new IllegalStateException("Cannot generate JWT: user id is null");
        }
        if (role == null) {
            throw new IllegalStateException("Cannot generate JWT: user role is null");
        }
        if (name == null || name.isBlank()) {
            name = user.getEmail();
        }

        Date now = new Date();
        return Jwts.builder()
                .subject(user.getEmail())
                .issuer(this.issuer)
                .claim("uid", userId.toString())
            .claim("name", name)
                .claim("role", role.name())
                .claim("roles", List.of(role.name()))
                .issuedAt(now)
                .expiration(new Date(now.getTime() + this.expiryMillis))
                .signWith(this.signingKey)
                .compact();
    }

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public UUID extractUserId(String token) {
        String uid = parseClaims(token).get("uid", String.class);
        if (uid == null || uid.isBlank()) {
            throw new IllegalArgumentException("JWT missing uid claim");
        }
        return UUID.fromString(uid);
    }

    public ROLES extractRole(String token) {
        String role = parseClaims(token).get("role", String.class);
        if (role == null || role.isBlank()) {
            throw new IllegalArgumentException("JWT missing role claim");
        }
        return ROLES.valueOf(role);
    }

    public Claims parseClaims(String token) {
        return parser.parseSignedClaims(token).getPayload();
    }
}

