package com.example.demo;

import java.util.Date;

public record ChoreDto(
    String assignedTo,
    String title,
    Date date,
    Integer repeatsInDays
) {}
