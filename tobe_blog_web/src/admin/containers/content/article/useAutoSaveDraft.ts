import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { saveDraft, getDraft, removeDraft } from './draftStorage';
import type { LocalDraft } from './types';

interface UseAutoSaveDraftProps {
  articleId: string;
  draft: Omit<LocalDraft, 'updatedAt'>;
}

export function useAutoSaveDraft({
  articleId,
  draft,
}: UseAutoSaveDraftProps) {
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
      saveDraft({ ...draft, articleId, updatedAt: Date.now() });
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
      saveDraft({ ...draft, articleId, updatedAt: Date.now() });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [articleId, draft]);

  // Save draft on component unmount (e.g., route navigation)
  useEffect(() => {
    return () => {
      saveDraft({ ...draft, articleId, updatedAt: Date.now() });
    };
  }, [articleId, draft, location.pathname]);

  // Clear local draft after successful save
  const clearDraft = async () => {
    await removeDraft(articleId);
  };

  // Expose getDraft for manual draft check
  const getDraftFn = async (id: string) => {
    return getDraft(id);
  };

  return { clearDraft, getDraft: getDraftFn };
} 