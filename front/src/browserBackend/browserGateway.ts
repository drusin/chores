import type { EditChoreDto, EditUserDto, Gateway } from '../types';
import { userBackend } from './userBackend';

export const browserGateway: Gateway = {
    getChores: async () => {
        return [];
    },

    createChore: async (_chore: EditChoreDto) => {
        throw new Error("Not implemented");
    },

    editChore: async (_id: number, _chore: EditChoreDto) => {
        throw new Error("Not implemented");
    },

    deleteChore: async (_id: number) => {
        throw new Error("Not implemented");
    },

    uploadImage: async (_image: File) => {
        return { name: 'dummy.png' };
    },

    getImageUrl: (_imageName: string) => {
        return '';
    },

    getUsers: async () => {
        return userBackend.getAll();
    },

    createUser: async (user: EditUserDto) => {
        return userBackend.create(user);
    },

    updateUser: async (id: number, user: EditUserDto) => {
        return userBackend.update(id, user);
    },

    deleteUser: async (id: number) => {
        return userBackend.delete(id);
    }
};
