import type { ChoreDto, EditChoreDto } from './types';

const API_URL = '/api/'

export async function getChores() {
    const request = await fetch(API_URL)
    const json = await request.json();
    return json as ChoreDto[];
}

export async function createChore(chore: EditChoreDto): Promise<ChoreDto> {
    const request = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(chore)
    });
    const json = await request.json();
    return json as ChoreDto;
}
