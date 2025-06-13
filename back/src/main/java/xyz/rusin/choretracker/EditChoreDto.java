package xyz.rusin.choretracker;

import java.util.Date;

import lombok.Builder;

@Builder(toBuilder = true)
public record EditChoreDto (
    String assignedTo,
    String title,
    Date plannedDate,
    String imageName,
    int repeatsEveryWeeks,
    boolean repeatsOnMonday,
    boolean repeatsOnTuesday,
    boolean repeatsOnWednesday,
    boolean repeatsOnThursday,
    boolean repeatsOnFriday,
    boolean repeatsOnSaturday,
    boolean repeatsOnSunday,
    boolean done
) {
    public EditChoreDto recurrence(Date newDate) {
        return toBuilder().plannedDate(newDate).done(false).build();
    }
}
