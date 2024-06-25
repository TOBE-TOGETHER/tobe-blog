import { ELocalStorageKeys, EDomain } from '../global/enums.ts';
import * as TimeFormat from './TimeFormat';

export function authed(requiredRole?: string[]): boolean {
  const userAuthorities = JSON.parse(localStorage.getItem(ELocalStorageKeys.AUTHORITIES) || '[]');
  // if no role required, then return true directly
  if (requiredRole) {
    let isValid: boolean = false;
    // iteritor all user's authority to see if any could match
    userAuthorities?.forEach((a: { authority: string }) => {
      if (requiredRole.indexOf(a.authority) > -1) {
        isValid = true;
        return;
      }
    });
    return isValid;
  }
  return true;
}

export function enabled(requiredFeature?: string): boolean {
  const userProfile = JSON.parse(localStorage.getItem(ELocalStorageKeys.CURRENT_USER) || '{}');
  // if no feature code required, then return true directly
  if (!requiredFeature) {
    return true;
  }
  return userProfile?.features?.[requiredFeature] === true;
}

export function formatDate(time: string) {
  return time.substring(0, time.indexOf('T'));
}

export function getDomainFromPath(path: string | undefined): EDomain {
  switch (path) {
    case 'articles':
      return EDomain.Article;
    case 'vocabularies':
      return EDomain.Vocabulary;
    case 'plan':
      return EDomain.Plan;
    default:
      return EDomain.Article;
  }
}

export function getPathFromDomain(domain: EDomain | string): string {
  switch (domain) {
    case EDomain.Article:
      return 'articles';
    case EDomain.Plan:
      return 'plan';
    case EDomain.Vocabulary:
      return 'vocabularies';
    default:
      return 'articles';
  }
}

export { TimeFormat };
