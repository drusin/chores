import gateway from "./state/gateway.ts";
import state from "./state/state.ts";

export interface ChoreDto extends EditChoreDto {
    id: number,
    doneDate: string | null,
}

export const RepeatMode = {
    none: 'NONE',
    days: 'DAYS',
    weeks: 'WEEKS',
} as const;

export interface EditChoreDto {
    assignedTo: number,
    title: string,
    plannedDate: string,
    imageName: string | null;
    repeatMode: typeof RepeatMode[keyof typeof RepeatMode];
    repeatsEveryDays: number,
    repeatsEveryWeeks: number,
    repeatsOnMonday: boolean,
    repeatsOnTuesday: boolean,
    repeatsOnWednesday: boolean,
    repeatsOnThursday: boolean,
    repeatsOnFriday: boolean,
    repeatsOnSaturday: boolean,
    repeatsOnSunday: boolean,
    done: boolean,
}

export type ImageMetadataDto = {
    name: string,
}

export type Chore = {
    data: ChoreDto,
    imageUrl: string | null,
    plannedDate: Date,
    doneDate: Date | null,
    status: string,
};

export interface UserDto extends EditUserDto {
    id: number,
}

export interface EditUserDto {
    name: string,
    imageName: string | null,
}

export type User = {
    data: UserDto,
    imageUrl: string | null,
}

export type Gateway = ReturnType<() => typeof gateway>;

export type StateApi = ReturnType<typeof state>;
