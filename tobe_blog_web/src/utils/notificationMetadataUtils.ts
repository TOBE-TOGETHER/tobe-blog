/**
 * Utility functions for handling notification metadata parsing
 */

import { INotificationDTO } from '../global/types';

export interface NotificationMetadata {
  readonly commentContent?: string;
  readonly originalCommentContent?: string;
  readonly contentType?: string;
  readonly contentTitle?: string;
  readonly commenterName?: string;
  readonly replierName?: string;
  [key: string]: string | undefined;
}

/**
 * Translate contentType from backend format to localized string
 * @param contentType contentType from backend (e.g., "ARTICLE", "article")
 * @param t translation function
 * @returns localized contentType
 */
export function translateContentType(contentType: string | undefined, t: (key: string) => string): string {
  if (!contentType) {
    return '';
  }
  
  // Normalize to lowercase for consistent lookup
  const normalizedType = contentType.toLowerCase();
  
  // Map content types to translation keys (using the correct path from translation files)
  const typeMap: Record<string, string> = {
    'article': 'admin-table.content-types.article',
    'plan': 'admin-table.content-types.plan', 
    'vocabulary': 'admin-table.content-types.vocabulary',
    'collection': 'admin-table.content-types.collection'
  };
  
  const translationKey = typeMap[normalizedType];
  if (translationKey) {
    return t(translationKey);
  }
  
  // Fallback to original value if no translation found
  return contentType;
}

/**
 * Parse notification metadata JSON safely
 * @param metadataJson JSON string to parse
 * @returns parsed metadata object or empty object if parsing fails
 */
export function parseNotificationMetadata(metadataJson: string | null | undefined): NotificationMetadata {
  if (!metadataJson?.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(metadataJson);
    return parsed || {};
  } catch (error) {
    console.warn('Failed to parse notification metadata:', error);
    return {};
  }
}

/**
 * Extract comment content from notification metadata
 * @param notification notification object
 * @returns comment content or null if not available
 */
export function getCommentContent(notification: INotificationDTO): string | null {
  if (!notification.metadata || 
      !['CONTENT_COMMENTED', 'COMMENT_REPLIED', 'COMMENT_DELETED', 'REPLY_DELETED'].includes(notification.notificationType)) {
    return null;
  }

  const metadata = parseNotificationMetadata(notification.metadata);
  return metadata.commentContent || null;
}

/**
 * Extract original comment content from notification metadata (for replies)
 * @param notification notification object
 * @returns original comment content or null if not available
 */
export function getOriginalCommentContent(notification: INotificationDTO): string | null {
  if (!notification.metadata || !['COMMENT_REPLIED', 'REPLY_DELETED'].includes(notification.notificationType)) {
    return null;
  }

  const metadata = parseNotificationMetadata(notification.metadata);
  return metadata.originalCommentContent || null;
}

/**
 * Check if notification has comment-related metadata
 * @param notification notification object
 * @returns true if notification has comment metadata
 */
export function hasCommentMetadata(notification: INotificationDTO): boolean {
  return getCommentContent(notification) !== null;
}

/**
 * Check if notification is a comment reply
 * @param notification notification object
 * @returns true if notification is a comment reply with original comment content
 */
export function isCommentReply(notification: INotificationDTO): boolean {
  return ['COMMENT_REPLIED', 'REPLY_DELETED'].includes(notification.notificationType) && 
         getOriginalCommentContent(notification) !== null;
}

/**
 * Get all metadata fields as a key-value object
 * @param notification notification object
 * @returns metadata object or empty object
 */
export function getAllMetadata(notification: INotificationDTO): NotificationMetadata {
  return parseNotificationMetadata(notification.metadata);
}

/**
 * Resolve notification title using i18n key and metadata parameters
 * @param notification notification object
 * @param t translation function
 * @returns localized title or fallback to original title
 */
export function resolveNotificationTitle(notification: INotificationDTO, t: (key: string, options?: any) => string): string {
  // Check if title is an i18n key (starts with 'notifications.messages.')
  if (notification.title.startsWith('notifications.messages.')) {
    try {
      const metadata = parseNotificationMetadata(notification.metadata);
      
      // Translate contentType if present
      const enhancedMetadata = { ...metadata };
      if (enhancedMetadata.contentType) {
        enhancedMetadata.contentType = translateContentType(enhancedMetadata.contentType, t);
      }
      
      return t(notification.title, enhancedMetadata);
    } catch (error) {
      console.warn('Failed to resolve notification title:', error);
      // Fallback to original title
      return notification.title;
    }
  }
  
  // Return original title if not an i18n key
  return notification.title;
}

/**
 * Resolve notification message using i18n key and metadata parameters
 * @param notification notification object
 * @param t translation function
 * @returns localized message or fallback to original message
 */
export function resolveNotificationMessage(notification: INotificationDTO, t: (key: string, options?: any) => string): string {
  // Check if message is an i18n key (starts with 'notifications.messages.')
  if (notification.message.startsWith('notifications.messages.')) {
    try {
      const metadata = parseNotificationMetadata(notification.metadata);
      
      // Translate contentType if present
      const enhancedMetadata = { ...metadata };
      if (enhancedMetadata.contentType) {
        enhancedMetadata.contentType = translateContentType(enhancedMetadata.contentType, t);
      }
      
      return t(notification.message, enhancedMetadata);
    } catch (error) {
      console.warn('Failed to resolve notification message:', error);
      // Fallback to original message
      return notification.message;
    }
  }
  
  // Return original message if not an i18n key
  return notification.message;
}

/**
 * Check if notification uses i18n keys
 * @param notification notification object
 * @returns true if notification uses i18n keys for title or message
 */
export function isI18nNotification(notification: INotificationDTO): boolean {
  return notification.title.startsWith('notifications.messages.') || 
         notification.message.startsWith('notifications.messages.');
} 