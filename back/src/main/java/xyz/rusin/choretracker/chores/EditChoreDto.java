package xyz.rusin.choretracker.chores;

import lombok.Builder;

import java.util.Date;

@Builder(toBuilder = true)
public record EditChoreDto (
    long assignedTo,
    String title,
    Date plannedDate,
    String imageName,
    RepeatMode repeatMode,
    int repeatsEveryDays,
    int repeatsEveryWeeks,
    boolean repeatsOnMonday,
    boolean repeatsOnTuesday,
    boolean repeatsOnWednesday,
    boolean repeatsOnThursday,
    boolean repeatsOnFriday,
    boolean repeatsOnSaturday,
    boolean repeatsOnSunday,
    boolean done
) implements Recurring {
    public EditChoreDto recurrence(Date newDate) {
        return toBuilder().plannedDate(newDate).done(false).build();
    }
}
