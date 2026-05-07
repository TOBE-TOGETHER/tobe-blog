# Tobe Blog Content MCP Server

A Model Context Protocol (MCP) server that provides access to the Tobe Blog content management APIs. This server enables AI assistants and tools to interact with the Tobe Blog backend service to manage articles, collections, plans, vocabularies, comments, and other content.

## Features

### Content Management
- **Articles**: Create, read, update, delete, search, and manage article visibility
- **Collections**: Manage content collections with hierarchical tag structures
- **Plans**: Create and track plans with progress items and timeline management
- **Vocabularies**: Manage language vocabularies with word definitions
- **Words**: Add and manage individual words within vocabularies

### Interaction & Engagement
- **Comments**: Create, view, and manage comments on content
- **Notifications**: View and manage user notifications
- **Tag Relationships**: Organize content with hierarchical tag structures

### Administration
- **Content Administration**: Ban, unban, recommend, and unrecommend content (admin only)
- **Content Search**: Search published content with advanced filters (admin only)
- **Visibility Management**: Publish and retract content

## Installation

1. **Clone or create the MCP server directory**:
   ```bash
   cd mcp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the TypeScript code**:
   ```bash
   npm run build
   ```

## Configuration

The server is configured through environment variables:

### Required Configuration
- `TOBE_BLOG_BASE_URL`: Base URL of the Tobe Blog backend service (default: `http://localhost:8080`)
- `TOBE_BLOG_AUTH_TOKEN`: JWT authentication token for API access

### Optional Configuration
- `TOBE_BLOG_TIMEOUT`: Request timeout in milliseconds (default: `30000`)

### Example Configuration
```bash
export TOBE_BLOG_BASE_URL="http://localhost:8080"
export TOBE_BLOG_AUTH_TOKEN="your-jwt-token-here"
export TOBE_BLOG_TIMEOUT="30000"
```

## Usage

### Running the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

### MCP Client Integration

To use this server with an MCP client, add it to your client's configuration:

```json
{
  "mcpServers": {
    "tobe-blog-content": {
      "command": "node",
      "args": ["/path/to/mcp/dist/index.js"],
      "env": {
        "TOBE_BLOG_BASE_URL": "http://localhost:8080",
        "TOBE_BLOG_AUTH_TOKEN": "your-jwt-token-here"
      }
    }
  }
}
```

## Available Tools

### Article Management

#### `create_article`
Create a new article with title, content, and metadata.

**Parameters:**
- `title` (string, required): Article title
- `description` (string, required): Article description
- `content` (string, required): Article content in HTML or markdown
- `subTitle` (string, optional): Article subtitle
- `coverImgUrl` (string, optional): Cover image URL
- `contentProtected` (boolean, optional): Whether content requires login to view
- `tags` (array, optional): Array of tag objects
- `topic` (enum, required): Topic category (READING, LANGUAGE, TECHNICAL, LIFE, OTHER)

#### `update_article`
Update an existing article.

**Parameters:** Same as `create_article` plus:
- `id` (string, required): Article ID to update

#### `delete_article`
Delete an article.

**Parameters:**
- `id` (string, required): Article ID to delete

#### `get_article`
Retrieve an article by ID.

**Parameters:**
- `id` (string, required): Article ID

#### `search_articles`
Search articles with filters and pagination.

**Parameters:**
- `current` (number, optional): Page number (default: 1)
- `size` (number, optional): Page size (default: 10, max: 100)
- `status` (string, optional): Content status filter
- `createFrom` (string, optional): Created from date (YYYY-MM-DD)
- `createTo` (string, optional): Created to date (YYYY-MM-DD)
- `updateFrom` (string, optional): Updated from date (YYYY-MM-DD)
- `updateTo` (string, optional): Updated to date (YYYY-MM-DD)
- `tags` (string, optional): Comma-separated tag names
- `keyword` (string, optional): Search keyword
- `topic` (enum, optional): Topic filter

#### `update_article_visibility`
Update article visibility (publish/retract).

**Parameters:**
- `id` (string, required): Article ID
- `visibility` (enum, required): Visibility setting (PUBLIC/PRIVATE)

### Collection Management

#### `create_collection`
Create a new collection.

**Parameters:**
- `title` (string, required): Collection title
- `description` (string, required): Collection description
- `coverImgUrl` (string, optional): Cover image URL
- `contentProtected` (boolean, optional): Whether content requires login to view
- `tags` (array, optional): Array of tag objects
- `topic` (enum, required): Topic category

#### `update_collection`, `delete_collection`, `get_collection`, `search_collections`, `update_collection_visibility`
Similar to article operations but for collections.

#### `get_collection_preview`
Get collection with related contents for preview.

**Parameters:**
- `id` (string, required): Collection ID

### Plan Management

#### `create_plan`
Create a new plan with timeline.

**Parameters:**
- `title` (string, required): Plan title
- `description` (string, required): Plan description
- `targetStartTime` (string, optional): Target start time (ISO date string)
- `targetEndTime` (string, optional): Target end time (ISO date string)
- `coverImgUrl` (string, optional): Cover image URL
- `contentProtected` (boolean, optional): Whether content requires login to view
- `tags` (array, optional): Array of tag objects
- `topic` (enum, required): Topic category

#### `update_plan`, `delete_plan`, `get_plan`, `search_plans`, `update_plan_visibility`
Similar to article operations but for plans.

#### `get_plan_progresses`
Get plan progress items.

**Parameters:**
- `id` (string, required): Plan ID
- `current` (number, optional): Page number
- `size` (number, optional): Page size

### Plan Progress Management

#### `create_plan_progress`
Create a new plan progress item.

**Parameters:**
- `planId` (string, required): Plan ID
- `title` (string, required): Progress item title
- `description` (string, optional): Progress item description
- `targetDate` (string, optional): Target completion date (ISO date string)

#### `update_plan_progress`
Update a plan progress item.

**Parameters:**
- `id` (string, required): Progress item ID
- `title` (string, required): Progress item title
- `description` (string, optional): Progress item description
- `completed` (boolean, required): Whether the progress item is completed
- `targetDate` (string, optional): Target completion date (ISO date string)
- `completedDate` (string, optional): Actual completion date (ISO date string)

#### `delete_plan_progress`, `get_plan_progress`
Delete or retrieve plan progress items.

### Vocabulary Management

#### `create_vocabulary`
Create a new vocabulary.

**Parameters:**
- `title` (string, required): Vocabulary title
- `description` (string, required): Vocabulary description
- `language` (string, required): Language of the vocabulary
- `coverImgUrl` (string, optional): Cover image URL
- `contentProtected` (boolean, optional): Whether content requires login to view
- `tags` (array, optional): Array of tag objects
- `topic` (enum, required): Topic category

#### `update_vocabulary`, `delete_vocabulary`, `get_vocabulary`, `search_vocabularies`, `update_vocabulary_visibility`
Similar to article operations but for vocabularies.

#### `get_words_by_vocabulary`
Get all words in a vocabulary.

**Parameters:**
- `vocabularyId` (string, required): Vocabulary ID

### Word Management

#### `create_word`
Create a new word in a vocabulary.

**Parameters:**
- `vocabularyId` (string, required): Vocabulary ID
- `text` (string, required): Word text
- `meaningInChinese` (string, optional): Chinese meaning
- `meaningInEnglish` (string, optional): English meaning
- `partOfSpeech` (string, optional): Part of speech

#### `update_word`
Update an existing word.

**Parameters:**
- `id` (number, required): Word ID
- `text` (string, required): Word text
- `meaningInChinese` (string, optional): Chinese meaning
- `meaningInEnglish` (string, optional): English meaning
- `partOfSpeech` (string, optional): Part of speech

#### `delete_word`, `get_word`
Delete or retrieve words.

**Parameters:**
- `id` (string, required): Content ID

## Data Types

### Content Types
- `ARTICLE`: Blog articles with rich content
- `PLAN`: Project plans with timeline and progress tracking
- `VOCABULARY`: Language learning vocabularies
- `COLLECTION`: Content collections with hierarchical organization

### Topics
- `READING`: Reading and literature content
- `LANGUAGE`: Language learning and linguistics
- `TECHNICAL`: Technical and programming content
- `LIFE`: Lifestyle and personal content
- `OTHER`: Other categories

### Visibility
- `PUBLIC`: Content visible to all users
- `PRIVATE`: Content visible only to owner

## Error Handling

The server includes comprehensive error handling:

- **Network Errors**: Automatic retry logic for transient failures
- **Authentication Errors**: Clear error messages for invalid tokens
- **Validation Errors**: Detailed validation feedback for invalid inputs
- **Server Errors**: Graceful handling of backend service errors

## Development

### Project Structure
```
mcp/
├── src/
│   ├── types.ts          # TypeScript interfaces matching backend DTOs
│   ├── api-client.ts     # HTTP client for backend API
│   ├── tools.ts          # MCP tool definitions
│   ├── tool-handlers.ts  # Tool execution handlers
│   └── index.ts          # Main server entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This documentation
```

### Contributing

1. **Type Safety**: All API interactions are fully typed using TypeScript interfaces that match the Java DTOs from the backend service.

2. **Error Handling**: Each tool handler includes proper error handling and user-friendly error messages.

3. **Validation**: Input validation is performed using Zod schemas to ensure data integrity.

4. **Documentation**: All tools include comprehensive documentation with parameter descriptions and examples.

### Adding New Tools

To add a new tool:

1. **Define the tool** in `tools.ts` with proper input schema
2. **Add the handler** in `tool-handlers.ts` with error handling
3. **Update the API client** in `api-client.ts` if new endpoints are needed
4. **Add types** in `types.ts` for any new data structures
5. **Update documentation** in this README

## Backend API Mapping

This MCP server maps to the following Tobe Blog backend API endpoints:

- `/v1/articles` - Article management
- `/v1/plans` - Plan management
- `/v1/plan-progresses` - Plan progress tracking
- `/v1/vocabularies` - Vocabulary management
- `/v1/words` - Word management
- `/v1/contents` - Content search (admin)

## License

This MCP server is part of the Tobe Blog project and follows the same licensing terms.

## Support

For issues, questions, or contributions, please refer to the main Tobe Blog project repository. 