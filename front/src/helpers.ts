import type { Chore, EditChoreDto } from "./types";

export function normalizeDate(date: Date) {
    const returnVal = new Date(date);
    returnVal.setHours(0, 0, 0, 0);
    return returnVal;
}

export function choreToEditChoreDto(chore: Chore): EditChoreDto {
    return Object.assign({}, chore, {
        plannedDate: chore.plannedDate.toISOString(),
        doneDate: chore.doneDate?.toISOString()
    });
}
