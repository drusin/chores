import type { EditUserDto, UserDto } from '../types';
import { add, getAll, put, remove, STORES } from './db';

export const userBackend = {
    getAll: async (): Promise<UserDto[]> => {
        return getAll<UserDto>(STORES.USERS);
    },

    create: async (user: EditUserDto): Promise<UserDto> => {
        // ID is auto-incremented by IndexedDB
        // We pass the user object, and add() returns the object with the new ID
        return add(STORES.USERS, user as UserDto);
    },

    update: async (id: number, user: EditUserDto): Promise<UserDto> => {
        const updatedUser = { id, ...user };
        return put(STORES.USERS, updatedUser);
    },

    delete: async (id: number): Promise<void> => {
        return remove(STORES.USERS, id);
    }
};
