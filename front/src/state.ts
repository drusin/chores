import { ref, type Ref } from 'vue';
import type { EditChoreDto, ChoreDto, Chore, State, Gateway, StateApi } from './types';
import { normalizeDate } from './helpers';

export const ChoreStatus = {
    PLANNED: 'planned',
    DUE: 'due',
    OVERDUE: 'overdue',
    DONE: 'done'
};

type Internals = {
    state: Ref<State>,
    gateway: Gateway
};

async function refreshChores(internals: Internals) {
    const choreDtos = await internals.gateway.getChores();
    const chores = choreDtos.map(fromDto);
    internals.state.value.chores = chores;
    sortChores(internals);
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

function choresFor(internals: Internals, name: string) {
    return internals.state.value.chores.filter(chore => chore.assignedTo === name);
}

async function createChore(internals: Internals, newChore: EditChoreDto) {
    await internals.gateway.createChore(newChore);
    await refreshChores(internals);
}

function sortChores(internals: Internals) {
    internals.state.value.chores.sort((left, right) => left.date.getTime() - right.date.getTime());
    internals.state.value.chores.sort((left, right) => (left.done ? 1 : -1) - (right.done ? 1 : -1));
}

async function toggleChore(internals: Internals, id: number) {
    const chore = internals.state.value.chores.find(c => c.id === id);
    if (!chore) {
        return;
    }
    const dto: EditChoreDto = Object.assign({}, chore, { done: !chore.done, date: chore.date.toISOString() });
    await internals.gateway.editChore(chore.id, dto);
    await refreshChores(internals);
}

async function deleteChore(internals: Internals, id: number) {
    await internals.gateway.deleteChore(id);
    await refreshChores(internals);
}

async function editChore(internals: Internals, id: number, chore: EditChoreDto) {
    await internals.gateway.editChore(id, chore);
    await refreshChores(internals);
}

export default function (gateway: Gateway): StateApi {
    const state: Ref<State> = ref({ 
        chores: [],
        users: [ 'Alex', 'Dawid', 'Vincent' ]
    });
    const internals: Internals = { state, gateway };
    refreshChores(internals);
    return {
        get chores() { return state.value.chores; },
        get users() { return state.value.users; },
        choresFor: (name: string) => choresFor(internals, name),
        createChore: (newChore: EditChoreDto) => createChore(internals, newChore),
        toggleChore: (id: number) => toggleChore(internals, id),
        deleteChore: (id: number) => deleteChore(internals, id),
        editChore: (id: number, chore: EditChoreDto) => editChore(internals, id, chore),
    }
}
