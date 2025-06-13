import type { ChoreDto, EditChoreDto, Gateway } from './types';

const API_URL = '/api/'
const CHORES_URL = API_URL + 'chores/';

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
    }

} as Gateway;
