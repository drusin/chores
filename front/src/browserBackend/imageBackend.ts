import type { ImageMetadataDto } from '../types';
import { add, get, STORES } from './db';

type ImageEntry = {
    name: string;
    blob: Blob;
};

export const imageBackend = {
    uploadImage: async (image: File): Promise<ImageMetadataDto> => {
        const name = `${Date.now()}-${image.name}`;
        const entry: ImageEntry = { name, blob: image };
        await add(STORES.IMAGES, entry);
        return { name };
    },

    getImageUrl: async (imageName: string): Promise<string | null> => {
        const entry = await get<ImageEntry>(STORES.IMAGES, imageName);
        if (entry) {
            return URL.createObjectURL(entry.blob);
        }
        return null;
    }
};
