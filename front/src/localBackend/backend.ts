import type { ChoreDto, EditChoreDto, EditUserDto, ImageMetadataDto, UserDto } from '../types';

const CHORES_KEY = 'chores';
const USERS_KEY = 'users';

// Initialize storage
function initStorage() {
    if (!localStorage.getItem(CHORES_KEY)) {
        localStorage.setItem(CHORES_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
}

// Image storage using IndexedDB for larger files
const IMAGE_DB_NAME = 'imageDB';
const IMAGE_STORE_NAME = 'images';

async function getImageDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(IMAGE_DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(IMAGE_STORE_NAME)) {
                db.createObjectStore(IMAGE_STORE_NAME, { keyPath: 'name' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export default {
    async getChores(): Promise<ChoreDto[]> {
        initStorage();
        return JSON.parse(localStorage.getItem(CHORES_KEY) || '[]');
    },

    async createChore(chore: EditChoreDto): Promise<ChoreDto> {
        const chores = await this.getChores();
        const newChore: ChoreDto = {
            ...chore,
            id: Date.now(),
            doneDate: chore.done ? new Date().toISOString() : null
        };
        chores.push(newChore);
        localStorage.setItem(CHORES_KEY, JSON.stringify(chores));
        return newChore;
    },

    async editChore(id: number, chore: EditChoreDto): Promise<ChoreDto> {
        const chores = await this.getChores();
        const index = chores.findIndex(c => c.id === id);

        if (index === -1) throw new Error('Chore not found');

        const updatedChore: ChoreDto = {
            ...chores[index],
            ...chore,
            doneDate: chore.done ? new Date().toISOString() : null
        };

        chores[index] = updatedChore;
        localStorage.setItem(CHORES_KEY, JSON.stringify(chores));
        return updatedChore;
    },

    async deleteChore(id: number): Promise<void> {
        const chores = await this.getChores();
        const filtered = chores.filter(c => c.id !== id);
        localStorage.setItem(CHORES_KEY, JSON.stringify(filtered));
    },

    async uploadImage(image: File): Promise<ImageMetadataDto> {
        const db = await getImageDB();
        const name = `img-${Date.now()}-${image.name}`;

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                const transaction = db.transaction(IMAGE_STORE_NAME, 'readwrite');
                const store = transaction.objectStore(IMAGE_STORE_NAME);

                store.put({
                    name,
                    data: reader.result,
                    type: image.type
                });

                transaction.oncomplete = () => resolve({ name });
                transaction.onerror = () => reject(transaction.error);
            };
            reader.readAsDataURL(image);
        });
    },

    getImageUrl(imageName: string): string {
        return imageName; // Actual URL handling in getImage()
    },

    async getImage(imageName: string): Promise<string> {
        const db = await getImageDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(IMAGE_STORE_NAME, 'readonly');
            const store = transaction.objectStore(IMAGE_STORE_NAME);
            const request = store.get(imageName);

            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result.data);
                } else {
                    reject(new Error('Image not found'));
                }
            };

            request.onerror = () => reject(request.error);
        });
    },

    async getUsers(): Promise<UserDto[]> {
        initStorage();
        return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    },

    async createUser(user: EditUserDto): Promise<UserDto> {
        const users = await this.getUsers();
        const newUser: UserDto = {
            ...user,
            id: Date.now()
        };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    },

    async updateUser(id: number, user: EditUserDto): Promise<UserDto> {
        const users = await this.getUsers();
        const index = users.findIndex(u => u.id === id);

        if (index === -1) throw new Error('User not found');

        const updatedUser: UserDto = {
            ...users[index],
            ...user
        };

        users[index] = updatedUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return updatedUser;
    },

    async deleteUser(id: number): Promise<void> {
        const users = await this.getUsers();
        const filtered = users.filter(u => u.id !== id);
        localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
    }
};