package urbantitan.code.services;

import org.modelmapper.ModelMapper;
import urbantitan.code.dto.user.UserRequestDTO;
import urbantitan.code.dto.user.UserResponseDTO;
import urbantitan.code.entities.User;
import urbantitan.code.repositories.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

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
            newUser.setRole(User.Role.USER);
        } else {
            newUser.setRole(User.Role.valueOf(userRequestDto.getRole().toUpperCase()));
        }

        User user = userRepository.save(newUser);
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public UserResponseDTO updatePartialUser(UUID id, Map<String, Object> updates) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
        updates.forEach((field, value) -> {
            switch (field) {
                case "name": 
                    user.setName((String) value);
                    break;

                case "email":
                    user.setEmail((String) value);
                    break;

                case "emailVerified":
                    if (value != null) user.setEmailVerified(OffsetDateTime.parse(value.toString()));
                    user.setEmailVerified(null);
                    break;

                case "image":
                    user.setImage((String) value);
                    break;

                case "role":
                    try {
                        user.setRole(User.Role.valueOf(value.toString().toUpperCase()));
                    } catch (IllegalArgumentException e) {
                        throw new IllegalArgumentException("Invalid role: " + value);
                    }
                    break;

                default:
                    throw new IllegalArgumentException("Field not allowed for update: "+field);
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
}