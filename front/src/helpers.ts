import type {EditChoreDto, EditUserDto} from "./types";

export function normalizeDate(date: Date) {
    const returnVal = new Date(date);
    returnVal.setHours(0, 0, 0, 0);
    return returnVal;
}

export function emptyEditChoreDto() {
    return {
        assignedTo: '',
        title: '',
        plannedDate: '',
        repeatsEveryWeeks: 0,
        repeatsOnMonday: false,
        repeatsOnTuesday: false,
        repeatsOnWednesday: false,
        repeatsOnThursday: false,
        repeatsOnFriday: false,
        repeatsOnSaturday: false,
        repeatsOnSunday: false,
        done: false
    } as EditChoreDto
}

export function emptyEditUserDto() {
    return {
        name: '',
        imageName: '',
    } as EditUserDto;
}
