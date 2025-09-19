package xyz.rusin.choretracker.chores;

public interface Recurring {
    int repeatsEveryWeeks();
    boolean repeatsOnMonday();
    boolean repeatsOnTuesday();
    boolean repeatsOnWednesday();
    boolean repeatsOnThursday();
    boolean repeatsOnFriday();
    boolean repeatsOnSaturday();
    boolean repeatsOnSunday();
}
