package xyz.rusin.choretracker.users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class UserEntity {
    private @Id @GeneratedValue Long id;
    private String name;
    private String imageName;

    public static UserEntity from(EditUserDto editUserDto) {
        return new UserEntity().update(editUserDto);
    }

    public UserEntity update(EditUserDto editUserDto) {
        name =  editUserDto.name();
        imageName = editUserDto.imageName();
        return this;
    }
}
