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
    Integer repeatsEveryWeeks,
    Boolean repeatsOnMonday,
    Boolean repeatsOnTuesday,
    Boolean repeatsOnWednesday,
    Boolean repeatsOnThursday,
    Boolean repeatsOnFriday,
    Boolean repeatsOnSaturday,
    Boolean repeatsOnSunday,
    Boolean done
) implements Repeatable {
    public EditChoreDto recurrence(Date newDate) {
        return toBuilder().plannedDate(newDate).done(false).build();
    }
}
