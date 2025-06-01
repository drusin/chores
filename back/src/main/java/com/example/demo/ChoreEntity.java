package com.example.demo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import jakarta.persistence.GeneratedValue;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChoreEntity {
    @Id @GeneratedValue Long id;
    String assignedTo;
    String title;
    Date plannedDate;
    Date doneDate;
    int repeatsEveryWeeks;
    boolean repeatsOnMonday;
    boolean repeatsOnTuesday;
    boolean repeatsOnWednesday;
    boolean repeatsOnThursday;
    boolean repeatsOnFriday;
    boolean repeatsOnSaturday;
    boolean repeatsOnSunday;
    boolean done;
   
    public static ChoreEntity from(EditChoreDto chore) {
        ChoreEntity entity = new ChoreEntity();
        entity.update(chore);
        return entity;
    }

    public void update(EditChoreDto update) {
        assignedTo = update.assignedTo();
        title = update.title();
        plannedDate = update.plannedDate();
        repeatsEveryWeeks = update.repeatsEveryWeeks();
        repeatsOnMonday = update.repeatsOnMonday();
        repeatsOnTuesday = update.repeatsOnTuesday();
        repeatsOnWednesday = update.repeatsOnWednesday();
        repeatsOnThursday = update.repeatsOnThursday();
        repeatsOnFriday = update.repeatsOnFriday();
        repeatsOnSaturday = update.repeatsOnSaturday();
        repeatsOnSunday = update.repeatsOnSunday();
        done = update.done();
    }
    
}
