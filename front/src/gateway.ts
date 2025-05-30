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
            body: JSON.stringify(chore)
        });
        const json = await request.json();
        return json as ChoreDto;
    }
} as Gateway;

