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

export type Gateway = {
    getChores: () => Promise<ChoreDto[]>;
    createChore: (chore: EditChoreDto) => Promise<ChoreDto>;
    editChore: (id: number, chore: EditChoreDto) => Promise<ChoreDto>;
    deleteChore: (id: number) => Promise<void>;
    uploadImage: (image: File) => Promise<ImageMetadataDto>;
    getImageUrl: (imageName: string) => Promise<string | null>;
    getUsers: () => Promise<UserDto[]>;
    createUser: (user: EditUserDto) => Promise<UserDto>;
    updateUser: (id: number, user: EditUserDto) => Promise<UserDto>;
    deleteUser: (id: number) => Promise<void>;
};

export type StateApi = ReturnType<typeof state>;
