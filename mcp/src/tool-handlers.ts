import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { TobeBlogApiClient } from './api-client.js';
import { 
  ArticleCreationDTO,
  ArticleUpdateDTO,
  PlanCreationDTO,
  PlanUpdateDTO,
  PlanProgressCreationDTO,
  PlanProgressUpdateDTO,
  VOCCreationDTO,
  VOCUpdateDTO,
  WordCreationDTO,
  WordUpdateDTO,
  ContentVisibilityUpdateDTO,
} from './types.js';

export class ToolHandlers {
  constructor(private apiClient: TobeBlogApiClient) {}

  async handleToolCall(request: CallToolRequest): Promise<CallToolResult> {
    try {
      const { name, arguments: args } = request.params;

      // Define handler mapping for cleaner code
      const handlers: Record<string, () => Promise<CallToolResult>> = {
        // Article handlers
        'create_article': () => this.createHandler(() => this.apiClient.createArticle(args as unknown as ArticleCreationDTO), 'Article'),
        'update_article': () => this.updateHandler(() => this.apiClient.updateArticle((args as any).id, args as unknown as ArticleUpdateDTO), 'Article'),
        'delete_article': () => this.deleteHandler(() => this.apiClient.deleteArticle((args as any).id), 'Article', (args as any).id),
        'get_article': () => this.getDetailsHandler(() => this.apiClient.getArticleById((args as any).id), this.formatArticleDetails),
        'search_articles': () => this.searchHandler(() => this.apiClient.searchArticles(args || {}), this.formatArticleList),
        'update_article_visibility': () => this.visibilityHandler(() => this.apiClient.updateArticleVisibility((args as any).id, args as unknown as ContentVisibilityUpdateDTO), 'Article'),

        // Plan handlers
        'create_plan': () => this.createHandler(() => this.apiClient.createPlan(args as unknown as PlanCreationDTO), 'Plan'),
        'update_plan': () => this.updateHandler(() => this.apiClient.updatePlan((args as any).id, args as unknown as PlanUpdateDTO), 'Plan'),
        'delete_plan': () => this.deleteHandler(() => this.apiClient.deletePlan((args as any).id), 'Plan', (args as any).id),
        'get_plan': () => this.getDetailsHandler(() => this.apiClient.getPlanById((args as any).id), this.formatPlanDetails),
        'search_plans': () => this.searchHandler(() => this.apiClient.searchPlans(args || {}), this.formatPlanList),
        'update_plan_visibility': () => this.visibilityHandler(() => this.apiClient.updatePlanVisibility((args as any).id, args as unknown as ContentVisibilityUpdateDTO), 'Plan'),

        // Plan progress handlers
        'get_plan_progresses': () => this.searchHandler(() => this.apiClient.getPlanProgresses((args as any).id, args || {}), this.formatPlanProgressList),
        'create_plan_progress': () => this.createHandler(() => this.apiClient.createPlanProgress(args as unknown as PlanProgressCreationDTO), 'Plan Progress'),
        'update_plan_progress': () => this.updateHandler(() => this.apiClient.updatePlanProgress(args as unknown as PlanProgressUpdateDTO), 'Plan Progress'),
        'delete_plan_progress': () => this.deleteHandler(() => this.apiClient.deletePlanProgress((args as any).id), 'Plan Progress', (args as any).id),
        'get_plan_progress': () => this.getDetailsHandler(() => this.apiClient.getPlanProgressById((args as any).id), this.formatPlanProgressDetails),

        // Vocabulary handlers
        'create_vocabulary': () => this.createHandler(() => this.apiClient.createVocabulary(args as unknown as VOCCreationDTO), 'Vocabulary'),
        'update_vocabulary': () => this.updateHandler(() => this.apiClient.updateVocabulary((args as any).id, args as unknown as VOCUpdateDTO), 'Vocabulary'),
        'delete_vocabulary': () => this.deleteHandler(() => this.apiClient.deleteVocabulary((args as any).id), 'Vocabulary', (args as any).id),
        'get_vocabulary': () => this.getDetailsHandler(() => this.apiClient.getVocabularyById((args as any).id), this.formatVocabularyDetails),
        'search_vocabularies': () => this.searchHandler(() => this.apiClient.searchVocabularies(args || {}), this.formatVocabularyList),
        'update_vocabulary_visibility': () => this.visibilityHandler(() => this.apiClient.updateVocabularyVisibility((args as any).id, args as unknown as ContentVisibilityUpdateDTO), 'Vocabulary'),

        // Word handlers
        'get_words_by_vocabulary': () => this.listHandler(() => this.apiClient.getWordsByVocabularyId((args as any).vocabularyId), this.formatWordList),
        'create_word': () => this.createHandler(() => this.apiClient.createWord(args as unknown as WordCreationDTO), 'Word'),
        'update_word': () => this.updateHandler(() => this.apiClient.updateWord((args as any).id, args as unknown as WordUpdateDTO), 'Word'),
        'delete_word': () => this.deleteHandler(() => this.apiClient.deleteWord((args as any).id), 'Word', (args as any).id),
        'get_word': () => this.getDetailsHandler(() => this.apiClient.getWordById((args as any).id), this.formatWordDetails),

        // Admin handlers
        'search_published_contents': () => this.searchHandler(() => this.apiClient.searchPublishedContents(args || {}), this.formatPublishedContentList),
        'get_content_basic_info': () => this.getDetailsHandler(() => this.apiClient.getContentBasicInfo((args as any).id), this.formatContentBasicInfo),
      };

      const handler = handlers[name];
      if (handler) {
        return await handler();
      }

      return this.errorResult(`Unknown tool: ${name}`);
    } catch (error) {
      return this.errorResult(`Error executing tool ${request.params.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Generic handler patterns
  private async createHandler<T>(apiCall: () => Promise<T>, entityType: string): Promise<CallToolResult> {
    const result = await apiCall();
    const item = result as any;
    return this.successResult(`${entityType} created successfully!\n\nID: ${item.id}\nTitle: ${item.title}\nDescription: ${item.description}\nCreated: ${item.createTime}\nPublic: ${item.publicToAll ? 'Yes' : 'No'}`);
  }

  private async updateHandler<T>(apiCall: () => Promise<T>, entityType: string): Promise<CallToolResult> {
    const result = await apiCall();
    const item = result as any;
    return this.successResult(`${entityType} updated successfully!\n\nID: ${item.id}\nTitle: ${item.title}\nDescription: ${item.description}\nUpdated: ${item.updateTime}`);
  }

  private async deleteHandler(apiCall: () => Promise<any>, entityType: string, id: string | number): Promise<CallToolResult> {
    await apiCall();
    return this.successResult(`${entityType} ${id} deleted successfully.`);
  }

  private async getDetailsHandler<T>(apiCall: () => Promise<T>, formatter: (item: T) => string): Promise<CallToolResult> {
    const result = await apiCall();
    return this.successResult(formatter(result));
  }

  private async searchHandler<T>(apiCall: () => Promise<{ records: T[] }>, formatter: (items: T[]) => string): Promise<CallToolResult> {
    const result = await apiCall();
    return this.successResult(formatter(result.records));
  }

  private async listHandler<T>(apiCall: () => Promise<T[]>, formatter: (items: T[]) => string): Promise<CallToolResult> {
    const result = await apiCall();
    return this.successResult(formatter(result));
  }

  private async visibilityHandler(apiCall: () => Promise<any>, entityType: string): Promise<CallToolResult> {
    const result = await apiCall();
    const item = result as any;
    return this.successResult(`${entityType} visibility updated!\n\nID: ${item.id}\nTitle: ${item.title}\nVisibility: ${item.visibility}\nPublish Time: ${item.publishTime}`);
  }

  // Utility methods
  private successResult(text: string): CallToolResult {
    return { content: [{ type: 'text', text }] };
  }

  private errorResult(text: string): CallToolResult {
    return { content: [{ type: 'text', text }], isError: true };
  }

  // Formatters
  private formatArticleDetails = (article: any): string => {
    return `Article Details:\n\nID: ${article.id}\nTitle: ${article.title}\nSubtitle: ${article.subTitle || 'N/A'}\nDescription: ${article.description}\nOwner: ${article.ownerName}\nTopic: ${article.topic}\nViews: ${article.viewCount}\nLikes: ${article.likeCount}\nPublic: ${article.publicToAll ? 'Yes' : 'No'}\nBanned: ${article.banned ? 'Yes' : 'No'}\nRecommended: ${article.recommended ? 'Yes' : 'No'}\nCreated: ${article.createTime}\nUpdated: ${article.updateTime}\n\nContent:\n${article.content}`;
  };

  private formatArticleList = (articles: any[]): string => {
    const articlesText = articles.map(article => 
      `- ${article.title} (ID: ${article.id}) - Views: ${article.viewCount}, Likes: ${article.likeCount}, Public: ${article.publicToAll ? 'Yes' : 'No'}`
    ).join('\n');
    return `Found ${articles.length} articles:\n\n${articlesText}`;
  };

  private formatPlanDetails = (plan: any): string => {
    return `Plan Details:\n\nID: ${plan.id}\nTitle: ${plan.title}\nDescription: ${plan.description}\nOwner: ${plan.ownerName}\nTopic: ${plan.topic}\nStart: ${plan.targetStartTime || 'N/A'}\nEnd: ${plan.targetEndTime || 'N/A'}\nViews: ${plan.viewCount}\nLikes: ${plan.likeCount}\nPublic: ${plan.publicToAll ? 'Yes' : 'No'}\nCreated: ${plan.createTime}\nUpdated: ${plan.updateTime}`;
  };

  private formatPlanList = (plans: any[]): string => {
    const plansText = plans.map(plan => 
      `- ${plan.title} (ID: ${plan.id}) - Views: ${plan.viewCount}, Likes: ${plan.likeCount}, Public: ${plan.publicToAll ? 'Yes' : 'No'}`
    ).join('\n');
    return `Found ${plans.length} plans:\n\n${plansText}`;
  };

  private formatPlanProgressDetails = (progress: any): string => {
    return `Plan Progress Details:\n\nID: ${progress.id}\nTitle: ${progress.title}\nDescription: ${progress.description || 'N/A'}\nPlan ID: ${progress.planId}\nCompleted: ${progress.completed ? 'Yes' : 'No'}\nTarget Date: ${progress.targetDate || 'N/A'}\nCompleted Date: ${progress.completedDate || 'N/A'}`;
  };

  private formatPlanProgressList = (progresses: any[]): string => {
    const progressText = progresses.map(progress => 
      `- ${progress.title} (ID: ${progress.id}) - Completed: ${progress.completed ? 'Yes' : 'No'}, Target: ${progress.targetDate || 'N/A'}`
    ).join('\n');
    return `Found ${progresses.length} plan progress items:\n\n${progressText}`;
  };

  private formatVocabularyDetails = (vocabulary: any): string => {
    return `Vocabulary Details:\n\nID: ${vocabulary.id}\nTitle: ${vocabulary.title}\nDescription: ${vocabulary.description}\nLanguage: ${vocabulary.language}\nOwner: ${vocabulary.ownerName}\nTopic: ${vocabulary.topic}\nViews: ${vocabulary.viewCount}\nLikes: ${vocabulary.likeCount}\nPublic: ${vocabulary.publicToAll ? 'Yes' : 'No'}\nCreated: ${vocabulary.createTime}\nUpdated: ${vocabulary.updateTime}`;
  };

  private formatVocabularyList = (vocabularies: any[]): string => {
    const vocText = vocabularies.map(voc => 
      `- ${voc.title} (ID: ${voc.id}) - Language: ${voc.language}, Views: ${voc.viewCount}, Likes: ${voc.likeCount}, Public: ${voc.publicToAll ? 'Yes' : 'No'}`
    ).join('\n');
    return `Found ${vocabularies.length} vocabularies:\n\n${vocText}`;
  };

  private formatWordDetails = (word: any): string => {
    return `Word Details:\n\nID: ${word.id}\nText: ${word.text}\nEnglish Meaning: ${word.meaningInEnglish || 'N/A'}\nChinese Meaning: ${word.meaningInChinese || 'N/A'}\nPart of Speech: ${word.partOfSpeech || 'N/A'}\nVocabulary ID: ${word.vocabularyId}`;
  };

  private formatWordList = (words: any[]): string => {
    const wordsText = words.map(word => 
      `- ${word.text} (ID: ${word.id}) - EN: ${word.meaningInEnglish || 'N/A'}, CN: ${word.meaningInChinese || 'N/A'}`
    ).join('\n');
    return `Found ${words.length} words:\n\n${wordsText}`;
  };



  private formatPublishedContentList = (contents: any[]): string => {
    const contentsText = contents.map(content => 
      `- ${content.title} (ID: ${content.id}) - Type: ${content.contentType}, Views: ${content.viewCount}, Likes: ${content.likeCount}, Status: ${content.banned ? 'Banned' : content.recommended ? 'Recommended' : 'Normal'}`
    ).join('\n');
    return `Found ${contents.length} published contents:\n\n${contentsText}`;
  };

  private formatContentBasicInfo = (info: any): string => {
    return `Content Basic Info:\n\nID: ${info.id}\nTitle: ${info.title}\nType: ${info.contentType}\nOwner: ${info.ownerName}\nPublic: ${info.publicToAll ? 'Yes' : 'No'}`;
  };
} 