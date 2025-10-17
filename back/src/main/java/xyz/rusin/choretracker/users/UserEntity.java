package xyz.rusin.choretracker.users;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
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
