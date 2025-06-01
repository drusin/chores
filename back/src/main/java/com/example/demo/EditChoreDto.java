package com.example.demo;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Builder(toBuilder = true)
public record EditChoreDto (
    String assignedTo,
    String title,
    Date plannedDate,
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
