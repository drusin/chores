package xyz.rusin.choretracker;

import lombok.SneakyThrows;
import xyz.rusin.choretracker.chores.EditChoreDto;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
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

    @SneakyThrows
    public static UUID getOrCreateUuid(Path folder) {
        Path uuidFile = folder.resolve("uuid");

        if (Files.exists(uuidFile)) {
            String uuidStr = Files.readString(uuidFile, StandardCharsets.UTF_8).trim();
            return UUID.fromString(uuidStr);
        }
        else {
            UUID uuid = UUID.randomUUID();
            Files.createDirectories(folder); // Ensure folder exists
            Files.writeString(uuidFile, uuid.toString(), StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
            return uuid;
        }
    }

    public static boolean isLocalNetwork(String ip) {
        return ip.startsWith("127.") ||
                ip.equals("0:0:0:0:0:0:0:1") ||
                ip.startsWith("192.168.") ||
                ip.startsWith("10.") ||
                ip.startsWith("172.16.") || ip.startsWith("172.17.") ||
                ip.startsWith("172.18.") || ip.startsWith("172.19.") ||
                ip.startsWith("172.20.") || ip.startsWith("172.21.") ||
                ip.startsWith("172.22.") || ip.startsWith("172.23.") ||
                ip.startsWith("172.24.") || ip.startsWith("172.25.") ||
                ip.startsWith("172.26.") || ip.startsWith("172.27.") ||
                ip.startsWith("172.28.") || ip.startsWith("172.29.") ||
                ip.startsWith("172.30.") || ip.startsWith("172.31.");
    }
}
