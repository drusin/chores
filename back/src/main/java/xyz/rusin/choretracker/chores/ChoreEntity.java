package xyz.rusin.choretracker.chores;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;
import lombok.Data;
import xyz.rusin.choretracker.users.UserEntity;

import java.util.Date;

@Entity
@Data
public class ChoreEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Date plannedDate;
    private Date doneDate;
    private String imageName;
    @Enumerated(EnumType.STRING)
    private RepeatMode repeatMode;
    private int repeatsEveryDays;
    private int repeatsEveryWeeks;
    private boolean repeatsOnMonday;
    private boolean repeatsOnTuesday;
    private boolean repeatsOnWednesday;
    private boolean repeatsOnThursday;
    private boolean repeatsOnFriday;
    private boolean repeatsOnSaturday;
    private boolean repeatsOnSunday;
    private boolean done;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIdentityReference(alwaysAsId = true)
    private UserEntity assignedTo;

    public static ChoreEntity from(EditChoreDto chore, UserEntity assignee) {
        return new ChoreEntity().update(chore, assignee);
    }

    public ChoreEntity update(EditChoreDto update, UserEntity assignee) {
        assignedTo = assignee;
        title = update.title();
        plannedDate = update.plannedDate();
        imageName = update.imageName();
        repeatMode = update.repeatMode();
        repeatsEveryDays = update.repeatsEveryDays();
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
