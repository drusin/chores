import { getChores, createChore as createChoreCall, type EditChoreDto, type ChoreDto } from './gateway.ts';
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

export async function setupState() {
    const choreDtos = await getChores();
    const chores = choreDtos.map(fromDto);
    state.value.chores = chores;
    sortChores();
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

export function choresFor(name: string) {
    return state.value.chores.filter(chore => chore.assignedTo === name);
}

export async function createChore(newChore: EditChoreDto) {
    const dto = await createChoreCall(newChore);
    const chore = fromDto(dto);
    state.value.chores.push(chore);
    sortChores();
}

function sortChores() {
    state.value.chores.sort((left, right) => left.date.getTime() - right.date.getTime());
}
