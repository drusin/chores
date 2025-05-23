const API_URL = '/api/'

type ChoreDto = {
    id: number,
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
