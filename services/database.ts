
import { SubSubSection } from '../types';

const DB_NAME = 'AtlasCoreDB';
const DB_VERSION = 1;
const STORE_NAME = 'DeepGuides';

interface StoredGuide {
    topicId: string;
    content: string;
    sources: string[];
    timestamp: number;
    title: string;
    pillarId: string;
}

// Open Database Connection
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => reject('Database error: ' + (event.target as any).errorCode);

        request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'topicId' });
            }
        };
    });
};

// Save Guide
export const saveGuideToDB = async (data: StoredGuide) => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(data);

        request.onsuccess = () => resolve();
        request.onerror = () => reject('Error saving guide');
    });
};

// Get Guide
export const getGuideFromDB = async (topicId: string): Promise<StoredGuide | undefined> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(topicId);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Error fetching guide');
    });
};

// Get All Stored Keys (to calculate progress)
export const getStoredTopicIds = async (): Promise<string[]> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAllKeys();

        request.onsuccess = () => resolve(request.result as string[]);
        request.onerror = () => reject('Error fetching keys');
    });
};

export const clearDatabase = async () => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject('Error clearing DB');
    });
};
