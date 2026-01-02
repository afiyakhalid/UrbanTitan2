package urbantitan.code.services;

import java.time.OffsetDateTime;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import urbantitan.code.dto.user.LoginRequestDTO;
import urbantitan.code.dto.user.UserRequestDTO;
import urbantitan.code.entities.User;
import urbantitan.code.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final GoogleTokenVerifierService googleTokenVerifierService;
    private final EmailOtpService emailOtpService;

    public String register(UserRequestDTO userRequest) {
        userService.registerUser(userRequest);
        User user = userRepository.findByEmail(userRequest.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found after registration"));
        return jwtService.generateToken(user);
    }

    public String login(LoginRequestDTO loginRequest) {
        try {
            User user = userService.authenticateUser(loginRequest);
            return jwtService.generateToken(user);
        } catch (IllegalArgumentException ex) {
            // Normalize to a proper 401 without leaking details.
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    public String googleLogin(String googleIdToken) {
        if (googleIdToken == null || googleIdToken.isBlank()) {
            throw new BadCredentialsException("Missing Google ID token");
        }

        var payload = googleTokenVerifierService.verify(googleIdToken);
        if (payload == null) {
            throw new BadCredentialsException("Invalid Google token");
        }

        Boolean emailVerified = payload.getEmailVerified();
        if (emailVerified != null && !emailVerified) {
            throw new BadCredentialsException("Google account email is not verified");
        }

        String email = payload.getEmail();
        if (email == null || email.isBlank()) {
            throw new BadCredentialsException("Google token missing email");
        }

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User u = new User();
                    u.setEmail(email);
                    String name = (String) payload.get("name");
                    if (name == null || name.isBlank()) {
                        name = fallbackNameFromEmail(email);
                    }
                    u.setName(name);
                    if (emailVerified != null && emailVerified) {
                        u.setEmailVerified(OffsetDateTime.now());
                    }
                    return userRepository.save(u);
                });

        // If they previously existed but now Google proves email verified, record it.
        if (user.getEmailVerified() == null && Boolean.TRUE.equals(emailVerified)) {
            user.setEmailVerified(OffsetDateTime.now());
            user = userRepository.save(user);
        }

        return jwtService.generateToken(user);
    }

    public EmailOtpService.OtpRequestResult requestEmailOtp(String email) {
        return emailOtpService.requestOtp(email);
    }

    public String verifyEmailOtp(String email, String otp) {
        User user = emailOtpService.verifyOtpAndGetOrCreateUser(email, otp);
        return jwtService.generateToken(user);
    }

    private static String fallbackNameFromEmail(String email) {
        int at = email.indexOf('@');
        String localPart = at > 0 ? email.substring(0, at) : email;
        if (localPart.isBlank()) {
            return "User";
        }
        return localPart.substring(0, 1).toUpperCase(Locale.ROOT) + localPart.substring(1);
    }
}
