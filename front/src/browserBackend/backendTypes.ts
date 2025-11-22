export interface Recurring {
    repeatsEveryWeeks: number;
    repeatsOnMonday: boolean;
    repeatsOnTuesday: boolean;
    repeatsOnWednesday: boolean;
    repeatsOnThursday: boolean;
    repeatsOnFriday: boolean;
    repeatsOnSaturday: boolean;
    repeatsOnSunday: boolean;
}

export interface DateHelper {
    nextOccurrence(from: Date, recurring: Recurring): Date | null;
    nextOccurrenceDays(from: Date, days: number): Date;
}
