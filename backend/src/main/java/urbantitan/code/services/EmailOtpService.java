package urbantitan.code.services;

import jakarta.mail.internet.MimeMessage;
import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import urbantitan.code.entities.EmailOtpChallenge;
import urbantitan.code.entities.User;
import urbantitan.code.enums.ROLES;
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
    private final JavaMailSender mailSender;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${security.otp.expiry-seconds:300}")
    private long otpExpirySeconds;

    @Value("${security.otp.debug-return:false}")
    private boolean debugReturnOtp;

    @Value("${security.mail.from-address:no-reply@urbantitan.in}")
    private String fromAddress;

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

        sendOtpEmail(normalizedEmail, otp);

        log.info("Email OTP requested for {}", normalizedEmail);
        return new OtpRequestResult(false, null);
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
                    // JWT generation requires a role; keep a safe default for OTP-created users.
                    u.setRole(ROLES.USER);
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

    private void sendOtpEmail(String toEmail, String otp) {
        String subject = "Your UrbanTitan verification code";
        String textBody = "Your UrbanTitan OTP is: " + otp + "\n\n" +
                "This code expires in " + Math.max(30, otpExpirySeconds) + " seconds.";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setFrom(fromAddress);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(textBody, false);
            mailSender.send(message);
        } catch (Exception e) {
            // Log enough to diagnose SMTP/TLS/auth issues without leaking secrets.
            log.error(
                    "Failed to send OTP email. from={}, to={}, host={}, port={}, cause={} : {}",
                    fromAddress,
                    toEmail,
                    System.getProperty("mail.smtp.host"),
                    System.getProperty("mail.smtp.port"),
                    e.getClass().getName(),
                    e.getMessage(),
                    e
            );
            throw new IllegalStateException("Failed to send OTP email");
        }
    }
}
