package com.example.demo;

import java.util.Date;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Builder(toBuilder = true)
public record EditChoreDto(
    String assignedTo,
    String title,
    Date date,
    Integer repeatsEveryWeeks,
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
        return toBuilder().date(newDate).build();
    }
}
