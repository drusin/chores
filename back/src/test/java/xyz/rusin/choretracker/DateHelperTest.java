package xyz.rusin.choretracker;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import xyz.rusin.choretracker.chores.EditChoreDto;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DateHelperTest {

    @Nested
    class EveryWeeksTests {
        private static final Date MONDAY = date(2024, Calendar.JUNE, 3);
        private static final Date TUESDAY = date(2024, Calendar.JUNE, 4);
        private static final Date WEDNESDAY = date(2024, Calendar.JUNE, 5);
        private static final Date THURSDAY = date(2024, Calendar.JUNE, 6);
        private static final Date FRIDAY = date(2024, Calendar.JUNE, 7);
        private static final Date SATURNDAY = date(2024, Calendar.JUNE, 8);
        private static final Date SUNDAY = date(2024, Calendar.JUNE, 9);

        @Test
        void tomorrow() {
            assertEquals(TUESDAY, DateHelper.nextOccurrence(MONDAY, baseBuilder().repeatsOnTuesday(true).build()));
        }

        @Test
        void todayInAWeek() {
            Date nextMonday = new GregorianCalendar(2024, Calendar.JUNE, 10).getTime();
            assertEquals(nextMonday, DateHelper.nextOccurrence(MONDAY, baseBuilder().repeatsOnMonday(true).build()));
        }

        @Test
        void yesterdayInAWeek() {
            Date nextMonday = new GregorianCalendar(2024, Calendar.JUNE, 10).getTime();
            assertEquals(nextMonday, DateHelper.nextOccurrence(TUESDAY, baseBuilder().repeatsOnMonday(true).build()));
        }

        @Test
        void tomorrowOnMonday() {
            Date nextMonday = new GregorianCalendar(2024, Calendar.JUNE, 10).getTime();
            assertEquals(nextMonday, DateHelper.nextOccurrence(SUNDAY, baseBuilder().repeatsOnMonday(true).build()));
        }

        @Test
        void nextMonth() {
            Date wedNextMonth = new GregorianCalendar(2024, Calendar.JULY, 3).getTime();
            assertEquals(wedNextMonth, DateHelper.nextOccurrence(WEDNESDAY, baseBuilder().repeatsOnWednesday(true).repeatsEveryWeeks(4).build()));
        }

        private EditChoreDto.EditChoreDtoBuilder baseBuilder() {
            return EditChoreDto.builder()
                    .assignedTo(1)
                    .title("Test")
                    .repeatsEveryWeeks(1)
                    .imageName("test.png")
                    .done(false);
        }
    }

    @Nested
    class EveryDaysTests {
        @Test
        void inOneDay() {
            assertEquals(date(2024, Calendar.JANUARY, 2), DateHelper.nextOccurrence(date(2024, Calendar.JANUARY, 1), 1));
        }

        @Test
        void nextMonth() {
            assertEquals(date(2024, Calendar.JANUARY, 25), DateHelper.nextOccurrence(date(2024, Calendar.FEBRUARY, 4), 10));
        }

        @Test
        void nextYear() {
            assertEquals(date(2024, Calendar.DECEMBER, 2), DateHelper.nextOccurrence(date(2025, Calendar.JANUARY, 3), 32));
        }
    }

    private static Date date(int year, int month, int day) {
        return new GregorianCalendar(year, month, day).getTime();
    }
}