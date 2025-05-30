package com.example.demo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChoreEntity {
    @Id @GeneratedValue Long id;
    String assignedTo;
    String title;
    Date date;
    Integer repeatsEveryWeeks;
    Boolean repeatsOnMonday;
    Boolean repeatsOnTuesday;
    Boolean repeatsOnWednesday;
    Boolean repeatsOnThursday;
    Boolean repeatsOnFriday;
    Boolean repeatsOnSaturday;
    Boolean repeatsOnSunday;
    Boolean done;
   
    public static ChoreEntity from(EditChoreDto chore) {
        ChoreEntity entity = new ChoreEntity();
        entity.update(chore);
        return entity;
    }

    public void update(EditChoreDto update) {
        assignedTo = update.assignedTo();
        title = update.title();
        date = update.date();
        repeatsInDays = update.repeatsInDays();
        done = update.done();
    }
    
}
