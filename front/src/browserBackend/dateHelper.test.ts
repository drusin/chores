import { describe, it, expect } from 'vitest';
import { dateHelper } from './dateHelper';
import type { Recurring } from '../types';

describe('DateHelper', () => {
    const date = (year: number, month: number, day: number) => new Date(year, month, day);

    // Java Calendar months are 0-indexed, same as JS Date
    const JANUARY = 0;
    const FEBRUARY = 1;
    // const MARCH = 2;
    // const APRIL = 3;
    // const MAY = 4;
    const JUNE = 5;
    const JULY = 6;
    // const AUGUST = 7;
    // const SEPTEMBER = 8;
    // const OCTOBER = 9;
    // const NOVEMBER = 10;
    const DECEMBER = 11;

    describe('EveryWeeksTests', () => {
        const MONDAY = date(2024, JUNE, 3);
        const TUESDAY = date(2024, JUNE, 4);
        const WEDNESDAY = date(2024, JUNE, 5);
        // const THURSDAY = date(2024, JUNE, 6);
        // const FRIDAY = date(2024, JUNE, 7);
        // const SATURDAY = date(2024, JUNE, 8);
        const SUNDAY = date(2024, JUNE, 9);

        const baseRecurring = (): Recurring => ({
            repeatsEveryWeeks: 1,
            repeatsOnMonday: false,
            repeatsOnTuesday: false,
            repeatsOnWednesday: false,
            repeatsOnThursday: false,
            repeatsOnFriday: false,
            repeatsOnSaturday: false,
            repeatsOnSunday: false,
        });

        it('tomorrow', () => {
            const recurring = { ...baseRecurring(), repeatsOnTuesday: true };
            expect(dateHelper.nextOccurrence(MONDAY, recurring)).toEqual(TUESDAY);
        });

        it('todayInAWeek', () => {
            const nextMonday = date(2024, JUNE, 10);
            const recurring = { ...baseRecurring(), repeatsOnMonday: true };
            expect(dateHelper.nextOccurrence(MONDAY, recurring)).toEqual(nextMonday);
        });

        it('yesterdayInAWeek', () => {
            const nextMonday = date(2024, JUNE, 10);
            const recurring = { ...baseRecurring(), repeatsOnMonday: true };
            expect(dateHelper.nextOccurrence(TUESDAY, recurring)).toEqual(nextMonday);
        });

        it('tomorrowOnMonday', () => {
            const nextMonday = date(2024, JUNE, 10);
            const recurring = { ...baseRecurring(), repeatsOnMonday: true };
            expect(dateHelper.nextOccurrence(SUNDAY, recurring)).toEqual(nextMonday);
        });

        it('nextMonth', () => {
            const wedNextMonth = date(2024, JULY, 3);
            const recurring = { ...baseRecurring(), repeatsOnWednesday: true, repeatsEveryWeeks: 4 };
            expect(dateHelper.nextOccurrence(WEDNESDAY, recurring)).toEqual(wedNextMonth);
        });
    });

    describe('EveryDaysTests', () => {
        it('inOneDay', () => {
            expect(dateHelper.nextOccurrenceDays(date(2024, JANUARY, 1), 1)).toEqual(date(2024, JANUARY, 2));
        });

        it('nextMonth', () => {
            expect(dateHelper.nextOccurrenceDays(date(2024, JANUARY, 25), 10)).toEqual(date(2024, FEBRUARY, 4));
        });

        it('nextYear', () => {
            expect(dateHelper.nextOccurrenceDays(date(2024, DECEMBER, 2), 32)).toEqual(date(2025, JANUARY, 3));
        });
    });
});
