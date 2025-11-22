import type { Recurring } from "../types"; export interface DateHelper {
    nextOccurrence(from: Date, recurring: Recurring): Date | null;
    nextOccurrenceDays(from: Date, days: number): Date;
}
