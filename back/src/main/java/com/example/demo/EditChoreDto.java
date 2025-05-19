package com.example.demo;

import java.util.Date;

public record EditChoreDto(
    String assignedTo,
    String title,
    Date date,
    Integer repeatsInDays,
    Boolean done
) {
    public EditChoreDto recurrence(Date newDate) {
        return new EditChoreDto(assignedTo, title, newDate, repeatsInDays, false);
    }
}
