import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EContentType, ELocalStorageKeys } from '../global/enums.ts';
import * as TimeFormat from './TimeFormat';

export const useCommonUtils = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return { t, enqueueSnackbar, navigate };
};

export function authed(requiredRole?: string[]): boolean {
  const userAuthorities = JSON.parse(localStorage.getItem(ELocalStorageKeys.AUTHORITIES) ?? '[]');
  // if no role required, then return true directly
  if (requiredRole) {
    let isValid: boolean = false;
    // iteritor all user's authority to see if any could match
    userAuthorities?.forEach((a: { authority: string }) => {
      if (requiredRole.indexOf(a.authority) > -1) {
        isValid = true;
      }
    });
    return isValid;
  }
  return true;
}

export function enabled(requiredFeature?: string): boolean {
  const userProfile = JSON.parse(localStorage.getItem(ELocalStorageKeys.CURRENT_USER) ?? '{}');
  // if no feature code required, then return true directly
  if (!requiredFeature) {
    return true;
  }
  return userProfile?.features?.[requiredFeature] === true;
}

export function formatDate(time: string) {
  return time.substring(0, time.indexOf('T'));
}

export function getContentTypeFromPath(path: string | undefined): EContentType {
  switch (path) {
    case 'articles':
      return EContentType.Article;
    case 'vocabularies':
      return EContentType.Vocabulary;
    case 'plans':
      return EContentType.Plan;
    case 'collections':
      return EContentType.Collection;
    default:
      return EContentType.Article;
  }
}

export function getPathFromContentType(contentType: EContentType | string): string {
  switch (contentType) {
    case EContentType.Article:
      return 'articles';
    case EContentType.Plan:
      return 'plans';
    case EContentType.Vocabulary:
      return 'vocabularies';
    case EContentType.Collection:
      return 'collections';
    default:
      return 'articles';
  }
}

export interface IMeta {
  name: string;
  content: string | undefined | null;
}

/**
 * This is a common function to switch meta values of the page,
 * The target values should be declared in the client component and passed into this function
 * The meta values can be restore by re-run this function, espectially can be used in effect function return body.
 */
export function switchMetas(metas: IMeta[]) {
  metas.forEach(m => {
    const tm: Element | null = document.querySelector(`META[name="${m.name}"]`);
    const originValue: string | undefined | null = tm?.getAttribute('content');
    tm?.setAttribute('content', `${m.content}`);
    m.content = originValue;
  });
}

export { TimeFormat };
