import { openDB, type IDBPDatabase } from 'idb';
import { ChatMessage } from './components/ChatWindow';

export interface AgentConversation {
  id: string;
  messages: ChatMessage[];
  updatedAt: number;
}

export class AgentStorage {
  private readonly DB_NAME = 'agent-conversations';
  private readonly STORE_NAME = 'conversations';
  private readonly DB_VERSION = 1;
  private readonly dbPromise = this.initializeDB();

  private async initializeDB(): Promise<IDBPDatabase> {
    try {
      if (!window.indexedDB) {
        throw new Error('Your browser does not support IndexedDB');
      }

      return await openDB(this.DB_NAME, this.DB_VERSION, {
        upgrade: db => {
          if (!db.objectStoreNames.contains(this.STORE_NAME)) {
            db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
          }
        },
      });
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      throw error;
    }
  }

  async saveConversation(conversation: AgentConversation): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.put(this.STORE_NAME, conversation);
    } catch (error) {
      console.error('Failed to save conversation:', error);
      throw error;
    }
  }

  async getConversation(id: string): Promise<AgentConversation | undefined> {
    try {
      const db = await this.dbPromise;
      return db.get(this.STORE_NAME, id);
    } catch (error) {
      console.error('Failed to get conversation:', error);
      throw error;
    }
  }

  async removeConversation(id: string): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.delete(this.STORE_NAME, id);
    } catch (error) {
      console.error('Failed to remove conversation:', error);
      throw error;
    }
  }

  async getAllConversations(): Promise<AgentConversation[]> {
    try {
      const db = await this.dbPromise;
      return db.getAll(this.STORE_NAME);
    } catch (error) {
      console.error('Failed to get all conversations:', error);
      throw error;
    }
  }
} 