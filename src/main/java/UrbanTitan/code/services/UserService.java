package urbantitan.code.services;

import org.modelmapper.ModelMapper;
import urbantitan.code.dto.user.UserRequestDTO;
import urbantitan.code.dto.user.UserResponseDTO;
import urbantitan.code.entities.User;
import urbantitan.code.repositories.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;
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
}