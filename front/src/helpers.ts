import {type EditChoreDto, RepeatMode} from "./types";

export function normalizeDate(date: Date) {
    const returnVal = new Date(date);
    returnVal.setHours(0, 0, 0, 0);
    return returnVal;
}

export function emptyEditChoreDto(): EditChoreDto {
    return {
        assignedTo: -1,
        title: '',
        plannedDate: '',
        imageName: '',
        repeatMode: RepeatMode.none,
        repeatsEveryDays: 0,
        repeatsEveryWeeks: 0,
        repeatsOnMonday: false,
        repeatsOnTuesday: false,
        repeatsOnWednesday: false,
        repeatsOnThursday: false,
        repeatsOnFriday: false,
        repeatsOnSaturday: false,
        repeatsOnSunday: false,
        done: false
    };
}

export function clone<T>(toClone: T): T {
    return JSON.parse(JSON.stringify(toClone));
}
