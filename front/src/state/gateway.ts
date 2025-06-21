import type {ChoreDto, EditChoreDto, ImageMetadataDto, UserDto} from '../types.ts';

const API_URL = '/api/'
const CHORES_URL = API_URL + 'chores/';
const IMAGE_URL = API_URL + 'images/';
const USERS_URL = API_URL + 'users/';

export default {
    getChores: async() => {
        const request = await fetch(CHORES_URL)
        const json = await request.json();
        return json as ChoreDto[];
    },
    
    createChore: async(chore: EditChoreDto) => {
        const request = await fetch(CHORES_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chore)
        });
        const json = await request.json();
        return json as ChoreDto;
    },

    editChore: async(id: number, chore: EditChoreDto) => {
        const request = await fetch(`${CHORES_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chore)
        });
        const json = await request.json();
        return json as ChoreDto;
    },

    deleteChore: async(id: number) => {
        await fetch(`${CHORES_URL}/${id}`, {
            method: 'DELETE'
        });
    },

    uploadImage: async(image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        const request = await fetch(IMAGE_URL, {
            method: 'POST',
            body: formData,
        });
        const json = await request.json();
        return json as ImageMetadataDto;
    },

    getImageUrl: (imageName: string) => {
        return location.protocol + '//' + window.location.host  + IMAGE_URL + imageName;
    },

    getUsers: async () => {
        const request = await fetch(USERS_URL);
        const json = await request.json();
        return json as UserDto[];
    },

};
