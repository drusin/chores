package com.example.demo;

import java.util.Date;

public record ChoreDto(
    String assignedTo,
    String title,
    Date date,
    Integer repeatsInDays,
    Boolean done
) {
    ChoreDto withDate(Date newDate) {
        return new ChoreDto(assignedTo, title, newDate, repeatsInDays, done);
    }
}
