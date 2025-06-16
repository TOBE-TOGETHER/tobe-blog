import { openDB } from 'idb';

import type { LocalDraft } from './types';
import { IndexedDBStorage } from '../../../../services/IndexedDBService';

export class DraftStorage extends IndexedDBStorage<LocalDraft> {
  protected readonly DB_NAME = 'article-drafts';
  protected readonly STORE_NAME = 'drafts';
  protected readonly DB_VERSION = 1;
  protected readonly dbPromise = this.initializeDB();

  private async initializeDB() {
    try {
      // Check if IndexedDB is supported
      if (!window.indexedDB) {
        throw new Error('Your browser does not support IndexedDB');
      }

      return await openDB(this.DB_NAME, this.DB_VERSION, {
        upgrade: db => {
          if (!db.objectStoreNames.contains(this.STORE_NAME)) {
            db.createObjectStore(this.STORE_NAME, { keyPath: 'articleId' });
          }
        },
      });
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      throw error;
    }
  }

  async saveDraft(draft: LocalDraft): Promise<void> {
    try {
      await this.save(draft);
    } catch (error) {
      console.error('Failed to save draft:', error);
      throw error;
    }
  }

  async getDraft(articleId: string): Promise<LocalDraft | undefined> {
    try {
      return await this.get(articleId);
    } catch (error) {
      console.error('Failed to get draft:', error);
      throw error;
    }
  }

  async removeDraft(articleId: string): Promise<void> {
    try {
      await this.remove(articleId);
    } catch (error) {
      console.error('Failed to remove draft:', error);
      throw error;
    }
  }
}
