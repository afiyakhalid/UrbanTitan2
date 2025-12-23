package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import urbantitan.code.entities.User;
import urbantitan.code.repositories.UserRepository;
import urbantitan.code.services.GoogleTokenVerifierService;
import urbantitan.code.services.JwtService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final GoogleTokenVerifierService googleVerifier;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(
            @RequestHeader("Authorization") String authHeader
    ) {

        String token = authHeader.substring(7);
        var payload = googleVerifier.verify(token);

        if (payload == null) {
            return ResponseEntity.status(401).body("Invalid Google token");
        }

        String email = payload.getEmail();

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User u = new User();
                    u.setEmail(email);
                    u.setName((String) payload.get("name"));
                    return userRepository.save(u);
                });

        String jwt = jwtService.generateToken(user);

        return ResponseEntity.ok(Map.of("token", jwt));
    }
}

