export type ChoreDto = {
    id: number,
    assignedTo: string,
    title: string,
    plannedDate: string,
    doneDate: string | null,
    repeatsEveryWeeks: number | null,
    repeatsOnMonday: boolean | null,
    repeatsOnTuesday: boolean | null,
    repeatsOnWednesday: boolean | null,
    repeatsOnThursday: boolean | null,
    repeatsOnFriday: boolean | null,
    repeatsOnSaturday: boolean | null,
    repeatsOnSunday: boolean | null,
    done: boolean
};

export type EditChoreDto = {
    assignedTo: string,
    title: string,
    plannedDate: string,
    repeatsEveryWeeks: number | null,
    repeatsOnMonday: boolean | null,
    repeatsOnTuesday: boolean | null,
    repeatsOnWednesday: boolean | null,
    repeatsOnThursday: boolean | null,
    repeatsOnFriday: boolean | null,
    repeatsOnSaturday: boolean | null,
    repeatsOnSunday: boolean | null,
    done: boolean
};

export type Chore = {
    id: number,
    assignedTo: string,
    title: string,
    plannedDate: Date,
    doneDate: Date | null
    repeatsEveryWeeks: number | null,
    repeatsOnMonday: boolean | null,
    repeatsOnTuesday: boolean | null,
    repeatsOnWednesday: boolean | null,
    repeatsOnThursday: boolean | null,
    repeatsOnFriday: boolean | null,
    repeatsOnSaturday: boolean | null,
    repeatsOnSunday: boolean | null,
    done: boolean,
    status: string
};

export type State = {
    chores: Chore[],
    users: string[]
};

export type Gateway = {
    getChores: () => Promise<ChoreDto[]>;
    createChore: (chore: EditChoreDto) => Promise<ChoreDto>;
    editChore: (id: number, chore: EditChoreDto) => Promise<ChoreDto>;
    deleteChore: (id: number) => Promise<void>;
};

export type StateApi = {
    chores: Chore[];
    users: string[];
    choresFor: (name: string) => Chore[];
    createChore: (newChore: EditChoreDto) => Promise<void>;
    toggleChore: (id: number) => Promise<void>;
    deleteChore: (id: number) => Promise<void>;
    editChore: (id: number, chore: EditChoreDto) => Promise<void>;
};
