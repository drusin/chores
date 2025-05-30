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