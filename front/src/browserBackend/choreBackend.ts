import type { ChoreDto, EditChoreDto } from '../types';
import { RepeatMode } from '../types';
import { add, getAll, put, remove, STORES } from './db';
import { dateHelper } from './dateHelper';

export const choreBackend = {
    getAll: async (): Promise<ChoreDto[]> => {
        const allChores = await getAll<ChoreDto>(STORES.CHORES);
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        return allChores.filter(chore => {
            if (!chore.done) return true;
            if (!chore.doneDate) return false; // Should not happen if done is true, but safety check
            return new Date(chore.doneDate) > oneDayAgo;
        });
    },

    create: async (chore: EditChoreDto): Promise<ChoreDto> => {
        const newChore = {
            ...chore,
            doneDate: chore.done ? new Date().toISOString() : null
        } as ChoreDto;
        return add(STORES.CHORES, newChore);
    },

    update: async (id: number, update: EditChoreDto): Promise<ChoreDto> => {
        const allChores = await getAll<ChoreDto>(STORES.CHORES);
        const existingChore = allChores.find(c => c.id === id);

        if (!existingChore) {
            throw new Error(`Chore with id ${id} not found`);
        }

        const updatedChore = { ...existingChore, ...update };

        // Handle status change
        if (!existingChore.done && update.done) {
            updatedChore.doneDate = new Date().toISOString();

            if (update.repeatMode !== RepeatMode.none) {
                await createRecurring(update);
            }
        } else if (existingChore.done && !update.done) {
            updatedChore.doneDate = null;
        }

        return put(STORES.CHORES, updatedChore);
    },

    delete: async (id: number): Promise<void> => {
        return remove(STORES.CHORES, id);
    }
};

async function createRecurring(chore: EditChoreDto) {
    const now = new Date();
    let nextDate: Date | null = null;

    if (chore.repeatMode === RepeatMode.days) {
        nextDate = dateHelper.nextOccurrenceDays(now, chore.repeatsEveryDays);
    } else {
        nextDate = dateHelper.nextOccurrence(now, chore);
    }

    if (nextDate) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...choreProps } = chore as any;
        const nextChore: EditChoreDto = {
            ...choreProps,
            plannedDate: nextDate.toISOString(),
            done: false,
        };
        await choreBackend.create(nextChore);
    }
}
