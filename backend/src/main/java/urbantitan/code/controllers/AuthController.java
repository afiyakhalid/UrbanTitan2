package urbantitan.code.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import urbantitan.code.dto.user.GoogleLoginRequestDTO;
import urbantitan.code.dto.user.LoginRequestDTO;
import urbantitan.code.dto.user.EmailOtpRequestDTO;
import urbantitan.code.dto.user.EmailOtpVerifyDTO;
import urbantitan.code.dto.user.UserRequestDTO;
import urbantitan.code.services.AuthService;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody(required = false) GoogleLoginRequestDTO body
    ) {
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        if ((token == null || token.isBlank()) && body != null) {
            token = body.getIdToken();
        }

        String jwt = authService.googleLogin(token);
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRequestDTO userRequest) {
        String jwt = authService.register(userRequest);
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        String jwt = authService.login(loginRequest);
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/otp/request")
    public ResponseEntity<?> requestEmailOtp(@Valid @RequestBody EmailOtpRequestDTO request) {
        var result = authService.requestEmailOtp(request.getEmail());
        if (result.debugEnabled()) {
            return ResponseEntity.ok(Map.of(
                    "message", "OTP sent (debug enabled)",
                    "debugOtp", result.debugOtp()
            ));
        }
        return ResponseEntity.ok(Map.of("message", "OTP sent"));
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<?> verifyEmailOtp(@Valid @RequestBody EmailOtpVerifyDTO request) {
        String jwt = authService.verifyEmailOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(Map.of("token", jwt));
    }
}
