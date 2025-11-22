import type { EditChoreDto, EditUserDto, Gateway } from '../types';
import { userBackend } from './userBackend';
import { imageBackend } from './imageBackend';
import { choreBackend } from './choreBackend';

export const browserGateway: Gateway = {
    getChores: async () => {
        return choreBackend.getAll();
    },

    createChore: async (chore: EditChoreDto) => {
        return choreBackend.create(chore);
    },

    editChore: async (id: number, chore: EditChoreDto) => {
        return choreBackend.update(id, chore);
    },

    deleteChore: async (id: number) => {
        return choreBackend.delete(id);
    },

    uploadImage: async (image: File) => {
        return imageBackend.uploadImage(image);
    },

    getImageUrl: async (imageName: string) => {
        return imageBackend.getImageUrl(imageName);
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
