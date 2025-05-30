import { ref, type Ref } from 'vue';
import type { EditChoreDto, ChoreDto, Chore, State, Gateway, StateApi } from './types';
import { normalizeDate } from './helpers';

export const ChoreStatus = {
    PLANNED: 'planned',
    DUE: 'due',
    OVERDUE: 'overdue',
    DONE: 'done'
};

async function refreshChores(state: Ref<State>, gateway: Gateway) {
    const choreDtos = await gateway.getChores();
    const chores = choreDtos.map(fromDto);
    state.value.chores = chores;
    sortChores(state);
}

function fromDto(dto: ChoreDto): Chore {
    const date = normalizeDate(new Date(dto.date));
    const done = dto.done;
    return { 
        id: dto.id,
        assignedTo: dto.assignedTo,
        title: dto.title,
        date: date,
        repeatsInDays: dto.repeatsInDays,
        done: done,
        get status() { return statusGetter({ done, date }); }
    };
}


function statusGetter({ done, date }: { done: boolean, date: Date} ) {
    if (done) {
        return ChoreStatus.DONE;
    }
    const now = normalizeDate(new Date());
    if (date.getTime() === now.getTime()) {
        return ChoreStatus.DUE;
    }
    if (now > date) {
        return ChoreStatus.OVERDUE;
    }
    return ChoreStatus.PLANNED;
}

function choresFor(state: Ref<State>, name: string) {
    return state.value.chores.filter(chore => chore.assignedTo === name);
}

async function createChore(state: Ref<State>, gateway: Gateway, newChore: EditChoreDto) {
    await gateway.createChore(newChore);
    await refreshChores(state, gateway);
}

function sortChores(state: Ref<State>) {
    state.value.chores.sort((left, right) => left.date.getTime() - right.date.getTime());
    state.value.chores.sort((left, right) => (left.done ? 1 : -1) - (right.done ? 1 : -1));
}

async function toggleChore(state: Ref<State>, gateway: Gateway, id: number) {
    const chore = state.value.chores.find(c => c.id === id);
    if (!chore) {
        return;
    }
    const dto: EditChoreDto = Object.assign({}, chore, { done: !chore.done, date: chore.date.toISOString() });
    await gateway.editChore(chore.id, dto);
    await refreshChores(state, gateway);
}

export default function (gateway: Gateway): StateApi {
    const state: Ref<State> = ref({ 
        chores: [],
        users: [ 'Alex', 'Dawid', 'Vincent' ]
    });
    refreshChores(state, gateway);
    return {
        get chores() { return state.value.chores; },
        get users() { return state.value.users; },
        choresFor: (name: string) => choresFor(state, name),
        createChore: (newChore: EditChoreDto) => createChore(state, gateway, newChore),
        toggleChore: (id: number) => toggleChore(state, gateway, id),
    }
}
