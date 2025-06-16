import { type IDBPDatabase } from 'idb';

export abstract class IndexedDBStorage<T extends { articleId: string }> {
  protected abstract readonly DB_NAME: string;
  protected abstract readonly STORE_NAME: string;
  protected abstract readonly DB_VERSION: number;
  protected abstract readonly dbPromise: Promise<IDBPDatabase>;

  async save(item: T): Promise<void> {
    const db = await this.dbPromise;
    await db.put(this.STORE_NAME, item);
  }

  async get(id: string): Promise<T | undefined> {
    const db = await this.dbPromise;
    return db.get(this.STORE_NAME, id);
  }

  async remove(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(this.STORE_NAME, id);
  }
}
