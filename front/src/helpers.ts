import type { Chore } from "./types";

export function normalizeDate(date: Date) {
    const returnVal = new Date(date);
    returnVal.setHours(0, 0, 0, 0);
    return returnVal;
}

export function choreToEditChoreDto(chore: Chore) {
    return {
        assignedTo: chore.assignedTo,
        title: chore.title,
        date: chore.date.toISOString(),
        repeatsInDays: chore.repeatsInDays,
        done: chore.done
    };
}
