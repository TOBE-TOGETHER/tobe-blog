/**
 * Utility functions for handling notification metadata parsing
 */

import { INotificationDTO } from '../global/types';

export interface NotificationMetadata {
  readonly commentContent?: string;
  readonly originalCommentContent?: string;
  [key: string]: string | undefined;
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
      !['CONTENT_COMMENTED', 'COMMENT_REPLIED'].includes(notification.notificationType)) {
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
  if (!notification.metadata || notification.notificationType !== 'COMMENT_REPLIED') {
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
  return notification.notificationType === 'COMMENT_REPLIED' && 
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