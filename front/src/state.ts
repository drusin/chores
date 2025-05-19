import { getChores } from './gateway.ts';

export type Chore = {
    id: number,
    assignedTo: string,
    title: string,
    date: Date,
    repeatsInDays: number,
    done: boolean
}

export type State = {
    chores: Chore[],
    users: string[]
}

export const state: State = {
    chores: [],
    users: [ 'Alex', 'Dawid', 'Vincent' ]
};

export async function setup() {
    const choreDtos = await getChores();
    const chores = choreDtos.map(dto => ({ 
        id: dto.id,
        assignedTo: dto.assignedTo,
        title: dto.title,
        date: dto.date,
        repeatsInDays: dto.repeatsInDays,
        done: dto.done
    }));
    state.chores.length = 0;
    state.chores.push(...chores);
}

export function choresFor(name: string) {
    return state.chores.filter(chore => chore.assignedTo === name);
}
