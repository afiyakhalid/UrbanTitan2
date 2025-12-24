package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import urbantitan.code.dto.user.LoginRequestDTO;
import urbantitan.code.dto.user.UserRequestDTO;
import urbantitan.code.entities.User;
import urbantitan.code.repositories.UserRepository;
import urbantitan.code.services.GoogleTokenVerifierService;
import urbantitan.code.services.JwtService;
import urbantitan.code.services.UserService;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final GoogleTokenVerifierService googleVerifier;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserService userService;

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

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRequestDTO userRequest) {
        try {
            var userResponse = userService.registerUser(userRequest);
            var user = userService.authenticateUser(new LoginRequestDTO(userRequest.getEmail(), userRequest.getPassword()));
            String jwt = jwtService.generateToken(user);
            return ResponseEntity.ok(Map.of("token", jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            var user = userService.authenticateUser(loginRequest);
            String jwt = jwtService.generateToken(user);
            return ResponseEntity.ok(Map.of("token", jwt));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
