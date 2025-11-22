import type { DateHelper, Recurring } from "./backendTypes";

export const dateHelper: DateHelper = {
    nextOccurrence(from: Date, recurring: Recurring): Date | null {
        const cal = getNormalizedDate(from);
        const todayDayOfWeek = cal.getDay(); // 0=Sun, 1=Mon...

        // Java DAYS_OF_WEEK: Mon, Tue, Wed, Thu, Fri, Sat, Sun
        // JS equivalents: 1, 2, 3, 4, 5, 6, 0
        const DAYS_OF_WEEK = [1, 2, 3, 4, 5, 6, 0];

        const index = DAYS_OF_WEEK.indexOf(todayDayOfWeek);

        // Check remaining days in current week
        for (let i = index + 1; i < DAYS_OF_WEEK.length; i++) {
            const day = DAYS_OF_WEEK[i];
            if (isRecurringOn(day, recurring)) {
                cal.setDate(cal.getDate() + (i - index));
                return cal;
            }
        }

        // Move to start of next occurrence week
        // Go back to Monday of current week
        cal.setDate(cal.getDate() - index);
        // Add weeks
        cal.setDate(cal.getDate() + (recurring.repeatsEveryWeeks * 7));

        // Check days in that week
        for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
            const day = DAYS_OF_WEEK[i];
            if (isRecurringOn(day, recurring)) {
                cal.setDate(cal.getDate() + i);
                return cal;
            }
        }

        return null;
    },

    nextOccurrenceDays(from: Date, days: number): Date {
        const cal = getNormalizedDate(from);
        cal.setDate(cal.getDate() + days);
        return cal;
    }
};

function getNormalizedDate(from: Date): Date {
    const cal = new Date(from);
    cal.setHours(0, 0, 0, 0);
    return cal;
}

function isRecurringOn(day: number, recurring: Recurring): boolean {
    switch (day) {
        case 1: return recurring.repeatsOnMonday;
        case 2: return recurring.repeatsOnTuesday;
        case 3: return recurring.repeatsOnWednesday;
        case 4: return recurring.repeatsOnThursday;
        case 5: return recurring.repeatsOnFriday;
        case 6: return recurring.repeatsOnSaturday;
        case 0: return recurring.repeatsOnSunday;
        default: return false;
    }
}
