package urbantitan.code.services;

import org.modelmapper.ModelMapper;
import urbantitan.code.dto.user.UserRequestDTO;
import urbantitan.code.dto.user.UserResponseDTO;
import urbantitan.code.entities.User;
import urbantitan.code.enums.ROLES;
import urbantitan.code.repositories.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import urbantitan.code.dto.user.LoginRequestDTO;

import java.time.OffsetDateTime;
import java.util.UUID;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> modelMapper.map(user, UserResponseDTO.class)).toList();
    }

    public UserResponseDTO getUserById(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public UserResponseDTO createUser(UserRequestDTO userRequestDto) {
        User newUser = modelMapper.map(userRequestDto, User.class);

        if (userRequestDto.getRole() == null || userRequestDto.getRole().isBlank()) {
            newUser.setRole(ROLES.USER);
        } else {
            newUser.setRole(ROLES.valueOf(userRequestDto.getRole().toUpperCase()));
        }

        User user = userRepository.save(newUser);
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public UserResponseDTO updatePartialUser(UUID id, Map<String, Object> updates) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
        updates.forEach((field, value) -> {
            switch (field) {
                case "name" -> user.setName((String) value);

                case "email" -> user.setEmail((String) value);

                case "emailVerified" -> {
                    if (value != null) {
                        user.setEmailVerified(OffsetDateTime.parse(value.toString()));
                    } else {
                        user.setEmailVerified(null);
                    }
                }

                case "role" -> {
                    try {
                        user.setRole(ROLES.valueOf(value.toString().toUpperCase()));
                    } catch (IllegalArgumentException e) {
                        throw new IllegalArgumentException("Invalid role: " + value);
                    }
                }

                default -> throw new IllegalArgumentException("Field not allowed for update: "+field);
            }
        });

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponseDTO.class);
    }

    public void deleteUserById(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Student does not exists by id: "+id);
        }
        userRepository.deleteById(id);
    }

    public UserResponseDTO registerUser(UserRequestDTO userRequestDto) {
        if (userRepository.findByEmail(userRequestDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        User newUser = modelMapper.map(userRequestDto, User.class);
        newUser.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        if (userRequestDto.getRole() == null || userRequestDto.getRole().isBlank()) {
            newUser.setRole(ROLES.USER);
        } else {
            newUser.setRole(ROLES.valueOf(userRequestDto.getRole().toUpperCase()));
        }
        User user = userRepository.save(newUser);
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public User authenticateUser(LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return user;
    }
}