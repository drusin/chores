package com.example.demo;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;

public class Helpers {
    public static List<DayOfWeek> getDaysOfWeek(Repeatable repeatable) {
        return List.of(
            repeatable.repeatsOnMonday() ? DayOfWeek.MONDAY : null,
            repeatable.repeatsOnTuesday() ? DayOfWeek.TUESDAY : null,
            repeatable.repeatsOnWednesday() ? DayOfWeek.WEDNESDAY : null,
            repeatable.repeatsOnThursday() ? DayOfWeek.THURSDAY : null,
            repeatable.repeatsOnFriday() ? DayOfWeek.FRIDAY : null,
            repeatable.repeatsOnSaturday() ? DayOfWeek.SATURDAY : null,
            repeatable.repeatsOnSunday() ? DayOfWeek.SUNDAY : null
        ).stream().filter(day -> day != null).toList();
    }

    public static Optional<DayOfWeek> findNextThisWeek(List<DayOfWeek> daysOfWeek) {
        DayOfWeek today = DayOfWeek.from(LocalDate.now());
        return daysOfWeek.stream()
            .filter(day -> day.getValue() > today.getValue())
            .findFirst();
    }

    public static LocalDate mondayInWeeks(int weeks) {
        LocalDate today = LocalDate.now();
        return today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).plusWeeks(weeks);
    }
}
