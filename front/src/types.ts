export type ChoreDto = {
    id: number,
    assignedTo: string,
    title: string,
    date: string,
    repeatsInDays: number,
    done: boolean
};

export type EditChoreDto = {
    assignedTo: string,
    title: string,
    date: string,
    repeatsInDays: number,
    done: boolean
};

export type Chore = {
    id: number,
    assignedTo: string,
    title: string,
    date: Date,
    repeatsInDays: number,
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
    readonly chores: Chore[];
    readonly users: string[];
    choresFor: (name: string) => Chore[];
    createChore: (newChore: EditChoreDto) => Promise<void>;
    toggleChore: (id: number) => Promise<void>;
    deleteChore: (id: number) => Promise<void>;
};
