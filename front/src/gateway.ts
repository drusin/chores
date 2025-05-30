import type { ChoreDto, EditChoreDto, Gateway } from './types';

const API_URL = '/api/'

export default {
    getChores: async() => {
        const request = await fetch(API_URL)
        const json = await request.json();
        return json as ChoreDto[];
    },
    
    createChore: async(chore: EditChoreDto) => {
        const request = await fetch(API_URL, {
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
        const request = await fetch(`${API_URL}/${id}`, {
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
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
    }

} as Gateway;
