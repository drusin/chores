package xyz.rusin.choretracker.chores;

import jakarta.persistence.*;
import lombok.Data;
import xyz.rusin.choretracker.users.UserEntity;

import java.util.Date;

@Entity
@Data
public class ChoreEntity {
    private @Id @GeneratedValue Long id;
    private String title;
    private Date plannedDate;
    private Date doneDate;
    private String imageName;
    private int repeatsEveryWeeks;
    private boolean repeatsOnMonday;
    private boolean repeatsOnTuesday;
    private boolean repeatsOnWednesday;
    private boolean repeatsOnThursday;
    private boolean repeatsOnFriday;
    private boolean repeatsOnSaturday;
    private boolean repeatsOnSunday;
    private boolean done;

    @ManyToOne
    private UserEntity assignedTo;

    public static ChoreEntity from(EditChoreDto chore, UserEntity assignee) {
        return new ChoreEntity().update(chore, assignee);
    }

    public ChoreEntity update(EditChoreDto update, UserEntity assignee) {
        assignedTo = assignee;
        title = update.title();
        plannedDate = update.plannedDate();
        imageName = update.imageName();
        repeatsEveryWeeks = update.repeatsEveryWeeks();
        repeatsOnMonday = update.repeatsOnMonday();
        repeatsOnTuesday = update.repeatsOnTuesday();
        repeatsOnWednesday = update.repeatsOnWednesday();
        repeatsOnThursday = update.repeatsOnThursday();
        repeatsOnFriday = update.repeatsOnFriday();
        repeatsOnSaturday = update.repeatsOnSaturday();
        repeatsOnSunday = update.repeatsOnSunday();
        done = update.done();
        return this;
    }
    
}
