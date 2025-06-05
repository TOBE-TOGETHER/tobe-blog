/**
 * Utility functions for building user display names consistently across the frontend
 */

export interface UserDisplayData {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly id?: string | number;
}

/**
 * Build a full display name from user data
 * @param user user data with name fields
 * @returns formatted display name
 */
export function buildFullName(user: UserDisplayData | null | undefined): string {
  if (!user) {
    return 'Anonymous User';
  }

  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();

  // Try to build full name from firstName and lastName
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  // If only firstName is available
  if (firstName) {
    return firstName;
  }

  // If only lastName is available
  if (lastName) {
    return lastName;
  }

  // Fall back to username if no name is available
  if (user.username?.trim()) {
    return user.username.trim();
  }

  // Last resort - use email prefix
  if (user.email?.trim()) {
    const email = user.email.trim();
    const atIndex = email.indexOf('@');
    if (atIndex > 0) {
      return email.substring(0, atIndex);
    }
    return email;
  }

  // Ultimate fallback
  return user.id ? `User ${user.id}` : 'Anonymous User';
}

/**
 * Get user initials for avatar display
 * @param user user data with name fields
 * @returns user initials (up to 2 characters)
 */
export function getUserInitials(user: UserDisplayData | null | undefined): string {
  if (!user) {
    return 'AU'; // Anonymous User
  }

  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();

  // Try to get initials from first and last name
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  // If only firstName is available
  if (firstName) {
    return firstName.charAt(0).toUpperCase();
  }

  // If only lastName is available
  if (lastName) {
    return lastName.charAt(0).toUpperCase();
  }

  // Fall back to username initial
  if (user.username?.trim()) {
    return user.username.charAt(0).toUpperCase();
  }

  // Last resort - use email initial
  if (user.email?.trim()) {
    return user.email.charAt(0).toUpperCase();
  }

  // Ultimate fallback
  return 'U';
}

/**
 * Check if user has a complete name (both first and last name)
 * @param user user data with name fields
 * @returns true if user has both first and last name
 */
export function hasCompleteName(user: UserDisplayData | null | undefined): boolean {
  return !!(user?.firstName?.trim() && user?.lastName?.trim());
}

/**
 * Format user name for display with optional fallback
 * @param user user data with name fields
 * @param fallback custom fallback text (default: 'Anonymous User')
 * @returns formatted name or fallback
 */
export function formatUserName(user: UserDisplayData | null | undefined, fallback: string = 'Anonymous User'): string {
  const name = buildFullName(user);
  return name === 'Anonymous User' ? fallback : name;
} 