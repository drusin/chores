import { ref, type Ref } from 'vue';
import type { EditChoreDto, ChoreDto, Chore, State, Gateway, StateApi } from './types';

export const ChoreStatus = {
    PLANNED: 'planned',
    DUE: 'due',
    OVERDUE: 'overdue',
    DONE: 'done'
};

async function setupState(state: Ref<State>, gateway: Gateway) {
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

function normalizeDate(date: Date) {
    const returnVal = new Date(date);
    returnVal.setHours(0, 0, 0, 0);
    return returnVal;
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
    const dto = await gateway.createChore(newChore);
    const chore = fromDto(dto);
    state.value.chores.push(chore);
    sortChores(state);
}

function sortChores(state: Ref<State>) {
    state.value.chores.sort((left, right) => left.date.getTime() - right.date.getTime());
}

export default function (gateway: Gateway): StateApi {
    const state: Ref<State> = ref({ 
        chores: [],
        users: [ 'Alex', 'Dawid', 'Vincent' ]
    });
    setupState(state, gateway);
    return {
        get chores() { return state.value.chores; },
        get users() { return state.value.users; },
        choresFor: (name: string) => choresFor(state, name),
        createChore: (newChore: EditChoreDto) => createChore(state, gateway, newChore)
    }
}
