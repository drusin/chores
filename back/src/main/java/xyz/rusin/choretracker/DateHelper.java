package xyz.rusin.choretracker;

import xyz.rusin.choretracker.chores.Recurring;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DateHelper {
    private static final List<Integer> DAYS_OF_WEEK = List.of(
        Calendar.MONDAY,
        Calendar.TUESDAY,
        Calendar.WEDNESDAY,
        Calendar.THURSDAY,
        Calendar.FRIDAY,
        Calendar.SATURDAY,
        Calendar.SUNDAY
    );

    public static Date nextOccurrence(Date from, Recurring recurring) {
        Calendar cal = getNormalizedCalender(from);

        int today = cal.get(Calendar.DAY_OF_WEEK);

        int index = DAYS_OF_WEEK.indexOf(today);
        for (int i = index + 1; i < DAYS_OF_WEEK.size(); i++) {
            int day = DAYS_OF_WEEK.get(i);
            if (isRecurringOn(day, recurring)) {
                cal.add(Calendar.DAY_OF_YEAR, i - index);
                return cal.getTime();
            }
        }
        
        cal.add(Calendar.DAY_OF_YEAR, -(index));
        cal.add(Calendar.WEEK_OF_YEAR, recurring.repeatsEveryWeeks());
        for (int i = 0; i < DAYS_OF_WEEK.size(); i++) {
            int day = DAYS_OF_WEEK.get(i);
            if (isRecurringOn(day, recurring)) {
                cal.add(Calendar.DAY_OF_YEAR, i);
                return cal.getTime();
            }
        }

        return null;
    }

    private static boolean isRecurringOn(int day, Recurring recurring) {
        return switch (day) {
            case Calendar.MONDAY -> recurring.repeatsOnMonday();
            case Calendar.TUESDAY -> recurring.repeatsOnTuesday();
            case Calendar.WEDNESDAY -> recurring.repeatsOnWednesday();
            case Calendar.THURSDAY -> recurring.repeatsOnThursday();
            case Calendar.FRIDAY -> recurring.repeatsOnFriday();
            case Calendar.SATURDAY -> recurring.repeatsOnSaturday();
            case Calendar.SUNDAY -> recurring.repeatsOnSunday();
            default -> false;
        };
    }

    public static Date nextOccurrence(Date from, int days) {
        Calendar cal = getNormalizedCalender(from);
        cal.add(Calendar.DAY_OF_YEAR, days);
        return cal.getTime();
    }

    private static Calendar getNormalizedCalender(Date from) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(from);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal;
    }

}
