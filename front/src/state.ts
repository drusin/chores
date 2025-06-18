import { ref, type Ref } from 'vue';
import type { Chore, ChoreDto, EditChoreDto, Gateway } from './types';
import { normalizeDate } from './helpers';

export const ChoreStatus = {
    PLANNED: 'planned',
    DUE: 'due',
    OVERDUE: 'overdue',
    DONE: 'done'
};

type State = {
    chores: Chore[],
    users: string[]
};

type Internals = {
    state: Ref<State>,
    gateway: Gateway
};

async function refreshChores(internals: Internals) {
    const choreDtos = await internals.gateway.getChores();
    internals.state.value.chores = choreDtos.map(c => fromDto(c, internals.gateway));
    sortChores(internals);
}

function fromDto(dto: ChoreDto, gateway: Gateway): Chore {
    const plannedDate = normalizeDate(new Date(dto.plannedDate));
    const doneDate = dto.doneDate ? normalizeDate(new Date(dto.doneDate)) : null;
    const done = dto.done;
    return {
        data: dto,
        imageUrl: dto.imageName ? gateway.getImageUrl(dto.imageName) : null,
        doneDate,
        plannedDate,
        get status() { return statusGetter(done, plannedDate); }
    };
}

function statusGetter(done: boolean, plannedDate: Date) {
    if (done) {
        return ChoreStatus.DONE;
    }
    const now = normalizeDate(new Date());
    if (plannedDate.getTime() === now.getTime()) {
        return ChoreStatus.DUE;
    }
    if (now > plannedDate) {
        return ChoreStatus.OVERDUE;
    }
    return ChoreStatus.PLANNED;
}

function choresFor(internals: Internals, name: string) {
    return internals.state.value.chores.filter(chore => chore.data.assignedTo === name);
}

async function createChore(internals: Internals, newChore: EditChoreDto) {
    await internals.gateway.createChore(newChore);
    await refreshChores(internals);
}

function sortChores(internals: Internals) {
    internals.state.value.chores.sort((left, right) => {
        if (left.doneDate) {
            if (right.doneDate) {
                return left.doneDate.getTime() - right.doneDate.getTime();
            }
            return 1; // left is done, right is not
        }
        if (right.doneDate) {
            return -1; // right is done, left is not
        }
        return left.plannedDate.getTime() - right.plannedDate.getTime();
    });
}

async function toggleChore(internals: Internals, id: number) {
    const chore = internals.state.value.chores.find(c => c.data.id === id);
    if (!chore) {
        return;
    }
    const dto: EditChoreDto = Object.assign({}, chore.data, {
        done: !chore.data.done,
        plannedDate: chore.plannedDate.toISOString()
    });
    await internals.gateway.editChore(chore.data.id, dto);
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

async function uploadImage(internals: Internals, image: File) {
    const { name } = await internals.gateway.uploadImage(image);
    return name;
}

export default function (gateway: Gateway) {
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
        uploadImage: (image: File) => uploadImage(internals, image),
    }
}
