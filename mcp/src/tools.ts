import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { TobeBlogApiClient } from './api-client.js';
import { Topic, Visibility } from './types.js';

// Shared schemas
const TagInfoSchema = z.object({
  id: z.number().optional(),
  value: z.string(),
  active: z.boolean().optional()
});

const BaseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  coverImgUrl: z.string().optional(),
  contentProtected: z.boolean().default(false),
  tags: z.array(TagInfoSchema).default([]),
  topic: z.nativeEnum(Topic)
});

const SearchParamsSchema = z.object({
  current: z.number().min(1).default(1),
  size: z.number().min(1).max(100).default(10),
  status: z.string().optional(),
  createFrom: z.string().optional(),
  createTo: z.string().optional(),
  updateFrom: z.string().optional(),
  updateTo: z.string().optional(),
  tags: z.string().optional(),
  keyword: z.string().optional(),
  topic: z.nativeEnum(Topic).optional()
});

const IdSchema = z.object({ id: z.string() });
const NumberIdSchema = z.object({ id: z.number() });
const VisibilityUpdateSchema = z.object({
  id: z.string(),
  visibility: z.nativeEnum(Visibility)
});

// Content-specific schemas
const ArticleCreationSchema = BaseContentSchema.extend({
  subTitle: z.string().optional(),
  content: z.string()
});

const ArticleUpdateSchema = ArticleCreationSchema.extend({
  id: z.string()
});

const PlanCreationSchema = BaseContentSchema.extend({
  targetStartTime: z.string().optional(),
  targetEndTime: z.string().optional()
});

const PlanUpdateSchema = PlanCreationSchema.extend({
  id: z.string()
});

const PlanProgressCreationSchema = z.object({
  planId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  targetDate: z.string().optional()
});

const PlanProgressUpdateSchema = PlanProgressCreationSchema.extend({
  id: z.string(),
  completed: z.boolean(),
  completedDate: z.string().optional()
});

const VOCCreationSchema = BaseContentSchema.extend({
  language: z.string()
});

const VOCUpdateSchema = VOCCreationSchema.extend({
  id: z.string()
});

const WordCreationSchema = z.object({
  vocabularyId: z.string(),
  text: z.string(),
  meaningInEnglish: z.string().optional(),
  meaningInChinese: z.string().optional(),
  partOfSpeech: z.string().optional()
});

const WordUpdateSchema = WordCreationSchema.extend({
  id: z.number()
});

// Utility function to create tool from schema
function createTool(name: string, description: string, schema: z.ZodSchema): Tool {
  return {
    name,
    description,
    inputSchema: zodToJsonSchema(schema, { target: 'jsonSchema7' }) as any
  };
}

// Tool creation function
export function createContentTools(apiClient: TobeBlogApiClient): Tool[] {
  return [
    // Article tools
    createTool('create_article', 'Create a new article', ArticleCreationSchema),
    createTool('update_article', 'Update an existing article', ArticleUpdateSchema),
    createTool('delete_article', 'Delete an article', IdSchema),
    createTool('get_article', 'Get an article by ID', IdSchema),
    createTool('search_articles', 'Search articles with filters and pagination', SearchParamsSchema),
    createTool('update_article_visibility', 'Update article visibility (publish/retract)', VisibilityUpdateSchema),

    // Plan tools
    createTool('create_plan', 'Create a new plan', PlanCreationSchema),
    createTool('update_plan', 'Update an existing plan', PlanUpdateSchema),
    createTool('delete_plan', 'Delete a plan', IdSchema),
    createTool('get_plan', 'Get a plan by ID', IdSchema),
    createTool('search_plans', 'Search plans with filters and pagination', SearchParamsSchema),
    createTool('update_plan_visibility', 'Update plan visibility (publish/retract)', VisibilityUpdateSchema),

    // Plan progress tools
    createTool('get_plan_progresses', 'Get plan progresses by plan ID', z.object({
      id: z.string(),
      current: z.number().min(1).default(1),
      size: z.number().min(1).max(100).default(10)
    })),
    createTool('create_plan_progress', 'Create a new plan progress item', PlanProgressCreationSchema),
    createTool('update_plan_progress', 'Update a plan progress item', PlanProgressUpdateSchema),
    createTool('delete_plan_progress', 'Delete a plan progress item', NumberIdSchema),
    createTool('get_plan_progress', 'Get a plan progress item by ID', IdSchema),

    // Vocabulary tools
    createTool('create_vocabulary', 'Create a new vocabulary', VOCCreationSchema),
    createTool('update_vocabulary', 'Update an existing vocabulary', VOCUpdateSchema),
    createTool('delete_vocabulary', 'Delete a vocabulary', IdSchema),
    createTool('get_vocabulary', 'Get a vocabulary by ID', IdSchema),
    createTool('search_vocabularies', 'Search vocabularies with filters and pagination', SearchParamsSchema),
    createTool('update_vocabulary_visibility', 'Update vocabulary visibility (publish/retract)', VisibilityUpdateSchema),

    // Word tools
    createTool('get_words_by_vocabulary', 'Get all words in a vocabulary', z.object({ vocabularyId: z.string() })),
    createTool('create_word', 'Create a new word in a vocabulary', WordCreationSchema),
    createTool('update_word', 'Update an existing word', WordUpdateSchema),
    createTool('delete_word', 'Delete a word', NumberIdSchema),
    createTool('get_word', 'Get a word by ID', NumberIdSchema),

    // Admin tools
    createTool('search_published_contents', 'Search published contents (admin only)', z.object({
      current: z.number().min(1).default(1),
      size: z.number().min(1).max(100).default(10),
      keyword: z.string().optional(),
      topic: z.string().optional(),
      status: z.string().optional()
    })),
    createTool('get_content_basic_info', 'Get basic content information for redirection', IdSchema)
  ];
} 