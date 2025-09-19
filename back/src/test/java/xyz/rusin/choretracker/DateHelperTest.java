package xyz.rusin.choretracker;

import org.junit.jupiter.api.Test;

import xyz.rusin.choretracker.chores.EditChoreDto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateHelperTest {
    private static final Date MONDAY = new GregorianCalendar(2024, Calendar.JUNE, 3).getTime();
    private static final Date TUESDAY = new GregorianCalendar(2024, Calendar.JUNE, 4).getTime();
    private static final Date WEDNESDAY = new GregorianCalendar(2024, Calendar.JUNE, 5).getTime();
    private static final Date THURSDAY = new GregorianCalendar(2024, Calendar.JUNE, 6).getTime();
    private static final Date FRIDAY = new GregorianCalendar(2024, Calendar.JUNE, 7).getTime();
    private static final Date SATURNDAY = new GregorianCalendar(2024, Calendar.JUNE, 8).getTime();
    private static final Date SUNDAY = new GregorianCalendar(2024, Calendar.JUNE, 9).getTime();
    
    @Test
    public void tomorrow() {
        assertEquals(TUESDAY, DateHelper.nextOccurrence(MONDAY, baseBuilder().repeatsOnTuesday(true).build()));
    }

    @Test
    public void todayInAWeek() {
        Date nextMonday = new GregorianCalendar(2024, Calendar.JUNE, 10).getTime();
        assertEquals(nextMonday, DateHelper.nextOccurrence(MONDAY, baseBuilder().repeatsOnMonday(true).build()));
    }
    
    @Test
    public void yesterdayInAWeek() {
        Date nextMonday = new GregorianCalendar(2024, Calendar.JUNE, 10).getTime();
        assertEquals(nextMonday, DateHelper.nextOccurrence(TUESDAY, baseBuilder().repeatsOnMonday(true).build()));
    }

    @Test
    public void tomorrowOnMonday() {
        Date nextMonday = new GregorianCalendar(2024, Calendar.JUNE, 10).getTime();
        assertEquals(nextMonday, DateHelper.nextOccurrence(SUNDAY, baseBuilder().repeatsOnMonday(true).build()));
    }

    @Test
    public void nextMonth() {
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