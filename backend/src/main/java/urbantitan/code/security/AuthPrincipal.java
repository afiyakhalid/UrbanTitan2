package urbantitan.code.security;

import java.security.Principal;
import java.util.UUID;
import urbantitan.code.enums.ROLES;

public record AuthPrincipal(
        UUID userId,
        String email,
        ROLES role
) implements Principal {
        @Override
        public String getName() {
                return email;
        }
}
