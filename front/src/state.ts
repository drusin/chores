import { getChores } from './gateway.ts';
import { ref, type Ref } from 'vue';

export const ChoreStatus = {
    PLANNED: 'planned',
    DUE: 'due',
    OVERDUE: 'overdue',
    DONE: 'done'
};

export type Chore = {
    id: number,
    assignedTo: string,
    title: string,
    date: Date,
    repeatsInDays: number,
    done: boolean,
    status: string
};

export type State = {
    chores: Chore[],
    users: string[]
};

export const state: Ref<State> = ref({ 
    chores: [],
    users: [ 'Alex', 'Dawid', 'Vincent' ]
});

export async function setup() {
    const choreDtos = await getChores();
    const chores = choreDtos.map(dto => ({ 
        id: dto.id,
        assignedTo: dto.assignedTo,
        title: dto.title,
        date: new Date(dto.date),
        repeatsInDays: dto.repeatsInDays,
        done: dto.done,
        get status() { return stateGetter(this); }
    }));
    state.value.chores = chores;
}

function stateGetter({ done, date }: { done: boolean, date: Date} ) {
    if (done) {
        return ChoreStatus.DONE;
    }
    const dueString = date.toDateString();
    const now = new Date().toDateString();
    if (dueString === now) {
        return ChoreStatus.DUE;
    }
    if (dueString > now) {
        return ChoreStatus.OVERDUE;
    }
    return ChoreStatus.PLANNED;
}

export function choresFor(name: string) {
    return state.value.chores.filter(chore => chore.assignedTo === name);
}
