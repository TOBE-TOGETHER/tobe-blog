import { openDB } from 'idb';
import type { LocalDraft } from './types';

const DB_NAME = 'article-drafts';
const STORE_NAME = 'drafts';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'articleId' });
    }
  },
});

export async function saveDraft(draft: LocalDraft): Promise<void> {
  const db = await dbPromise;
  await db.put(STORE_NAME, draft);
}

export async function getDraft(articleId: string): Promise<LocalDraft | undefined> {
  const db = await dbPromise;
  return db.get(STORE_NAME, articleId);
}

export async function removeDraft(articleId: string): Promise<void> {
  const db = await dbPromise;
  await db.delete(STORE_NAME, articleId);
} 