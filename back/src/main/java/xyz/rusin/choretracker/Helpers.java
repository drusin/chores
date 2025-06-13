package xyz.rusin.choretracker;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

public class Helpers {
    public static List<DayOfWeek> getDaysOfWeek(EditChoreDto dto) {
        return Stream.of(
            dto.repeatsOnMonday() ? DayOfWeek.MONDAY : null,
            dto.repeatsOnTuesday() ? DayOfWeek.TUESDAY : null,
            dto.repeatsOnWednesday() ? DayOfWeek.WEDNESDAY : null,
            dto.repeatsOnThursday() ? DayOfWeek.THURSDAY : null,
            dto.repeatsOnFriday() ? DayOfWeek.FRIDAY : null,
            dto.repeatsOnSaturday() ? DayOfWeek.SATURDAY : null,
            dto.repeatsOnSunday() ? DayOfWeek.SUNDAY : null
        ).filter(Objects::nonNull).toList();
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
