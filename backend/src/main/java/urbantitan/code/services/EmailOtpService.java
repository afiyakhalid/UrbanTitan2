package urbantitan.code.services;

import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urbantitan.code.entities.EmailOtpChallenge;
import urbantitan.code.entities.User;
import urbantitan.code.repositories.EmailOtpChallengeRepository;
import urbantitan.code.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class EmailOtpService {

    private static final Logger log = LoggerFactory.getLogger(EmailOtpService.class);

    private static final int OTP_LENGTH = 6;
    private static final int MAX_ATTEMPTS = 5;

    private final EmailOtpChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${security.otp.expiry-seconds:300}")
    private long otpExpirySeconds;

    @Value("${security.otp.debug-return:false}")
    private boolean debugReturnOtp;

    public record OtpRequestResult(boolean debugEnabled, String debugOtp) {
    }

    @Transactional
    public OtpRequestResult requestOtp(String email) {
        String normalizedEmail = normalizeEmail(email);
        String otp = generateOtp();

        EmailOtpChallenge challenge = new EmailOtpChallenge();
        challenge.setEmail(normalizedEmail);
        challenge.setOtpHash(encoder.encode(otp));
        challenge.setAttempts(0);
        challenge.setExpiresAt(OffsetDateTime.now().plusSeconds(Math.max(30, otpExpirySeconds)));
        challengeRepository.save(challenge);

        // Production note: integrate real email delivery here.
        // For now we log OTP (and optionally return it only when debug is enabled).
        log.info("Email OTP requested for {}. OTP={} (debug only)", normalizedEmail, otp);

        return new OtpRequestResult(debugReturnOtp, debugReturnOtp ? otp : null);
    }

    @Transactional
    public User verifyOtpAndGetOrCreateUser(String email, String otp) {
        String normalizedEmail = normalizeEmail(email);

        EmailOtpChallenge challenge = challengeRepository.findTopByEmailOrderByCreatedAtDesc(normalizedEmail)
                .orElseThrow(() -> new BadCredentialsException("OTP not requested"));

        if (challenge.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new BadCredentialsException("OTP expired");
        }

        if (challenge.getAttempts() >= MAX_ATTEMPTS) {
            throw new BadCredentialsException("Too many OTP attempts");
        }

        if (!encoder.matches(otp, challenge.getOtpHash())) {
            challenge.setAttempts(challenge.getAttempts() + 1);
            challengeRepository.save(challenge);
            throw new BadCredentialsException("Invalid OTP");
        }

        // Successful verification: clear challenges for this email.
        challengeRepository.deleteByEmail(normalizedEmail);

        return userRepository.findByEmail(normalizedEmail)
                .orElseGet(() -> {
                    User u = new User();
                    u.setEmail(normalizedEmail);
                    u.setName(fallbackNameFromEmail(normalizedEmail));
                    u.setEmailVerified(OffsetDateTime.now());
                    return userRepository.save(u);
                });
    }

    private static String normalizeEmail(String email) {
        if (email == null) {
            throw new BadCredentialsException("Email is required");
        }
        String trimmed = email.trim();
        if (trimmed.isBlank()) {
            throw new BadCredentialsException("Email is required");
        }
        return trimmed.toLowerCase(Locale.ROOT);
    }

    private String generateOtp() {
        int max = (int) Math.pow(10, OTP_LENGTH);
        int value = secureRandom.nextInt(max);
        return String.format(Locale.ROOT, "%0" + OTP_LENGTH + "d", value);
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
