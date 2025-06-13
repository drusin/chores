export type ChoreDto = {
    id: number,
    assignedTo: string,
    title: string,
    plannedDate: string,
    imageName: string,
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
    imageName: string;
    assignedTo: string,
    title: string,
    plannedDate: string,
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
    id: number,
    assignedTo: string,
    title: string,
    plannedDate: Date,
    imageName: string,
    doneDate: Date | null
    repeatsEveryWeeks: number,
    repeatsOnMonday: boolean,
    repeatsOnTuesday: boolean,
    repeatsOnWednesday: boolean,
    repeatsOnThursday: boolean,
    repeatsOnFriday: boolean,
    repeatsOnSaturday: boolean,
    repeatsOnSunday: boolean,
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
    uploadImage: (image: File) => Promise<ImageMetadataDto>;
    getImageUrl: (imageName: string) => string;
};

export type StateApi = {
    chores: Chore[];
    users: string[];
    choresFor: (name: string) => Chore[];
    createChore: (newChore: EditChoreDto) => Promise<void>;
    toggleChore: (id: number) => Promise<void>;
    deleteChore: (id: number) => Promise<void>;
    editChore: (id: number, chore: EditChoreDto) => Promise<void>;
    uploadImage: (image: File) => Promise<string>;
};
