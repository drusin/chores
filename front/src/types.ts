import gateway from "./gateway.ts";
import state from "./state.ts";

export type ChoreDto = {
    id: number,
    assignedTo: string,
    title: string,
    plannedDate: string,
    imageName: string | null,
    doneDate: string | null,
    repeatsEveryWeeks: number,
    repeatsOnMonday: boolean,
    repeatsOnTuesday: boolean,
    repeatsOnWednesday: boolean,
    repeatsOnThursday: boolean,
    repeatsOnFriday: boolean,
    repeatsOnSaturday: boolean,
    repeatsOnSunday: boolean,
    done: boolean
};

export type EditChoreDto = {
    assignedTo: string,
    title: string,
    plannedDate: string,
    imageName: string | null;
    repeatsEveryWeeks: number,
    repeatsOnMonday: boolean,
    repeatsOnTuesday: boolean,
    repeatsOnWednesday: boolean,
    repeatsOnThursday: boolean,
    repeatsOnFriday: boolean,
    repeatsOnSaturday: boolean,
    repeatsOnSunday: boolean,
    done: boolean
};

export type ImageMetadataDto = {
    name: string,
}

export type Chore = {
    data: ChoreDto,
    imageUrl: string | null
    plannedDate: Date,
    doneDate: Date | null
    status: string
};

export type Gateway = ReturnType<() => typeof gateway>;

export type StateApi = ReturnType<typeof state>;
