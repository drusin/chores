const API_URL = '/api/'

export type ChoreDto = {
    id: number,
    assignedTo: string,
    title: string,
    date: string,
    repeatsInDays: number,
    done: boolean
}

export type EditChoreDto = {
    assignedTo: string,
    title: string,
    date: string,
    repeatsInDays: number,
    done: boolean
}

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
