package xyz.rusin.choretracker.users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping(path = "/users")
@RequiredArgsConstructor
public class UserApi {
    private final UserRepository userRepository;

    @PostMapping(path = "/")
    public UserEntity createUser(@RequestBody EditUserDto editUserDto) {
        return userRepository.save(UserEntity.from(editUserDto));
    }

    @GetMapping(path = "/")
    public List<UserEntity> getUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false).toList();
    }

    @PutMapping(path = "/{id}")
    public UserEntity updateUser(@RequestBody EditUserDto editUserDto, @PathVariable Long id) {
        UserEntity entity = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("User with id %d was not found", id)));
        entity.update(editUserDto);
        return userRepository.save(entity);
    }

}
