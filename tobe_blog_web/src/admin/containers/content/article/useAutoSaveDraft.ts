import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import type { LocalDraft } from './types';
import { DraftStorage } from './draftStorage';

interface UseAutoSaveDraftProps {
  articleId: string;
  draft: Omit<LocalDraft, 'updatedAt'>;
}

const draftStorage = new DraftStorage();

export function useAutoSaveDraft({ articleId, draft }: UseAutoSaveDraftProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Auto save with debounce
  useEffect(() => {
    if (!articleId) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      draftStorage.saveDraft({ ...draft, articleId, updatedAt: Date.now() });
    }, 2000); // 2 seconds debounce
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [articleId, draft]);

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      draftStorage.saveDraft({ ...draft, articleId, updatedAt: Date.now() });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [articleId, draft]);

  // Save draft on component unmount (e.g., route navigation)
  useEffect(() => {
    return () => {
      draftStorage.saveDraft({ ...draft, articleId, updatedAt: Date.now() });
    };
  }, [articleId, draft, location.pathname]);

  // Clear local draft after successful save
  const clearDraft = async () => {
    await draftStorage.removeDraft(articleId);
  };

  // Expose getDraft for manual draft check
  const getDraftFn = async (id: string) => {
    return draftStorage.getDraft(id);
  };

  return { clearDraft, getDraft: getDraftFn };
}
