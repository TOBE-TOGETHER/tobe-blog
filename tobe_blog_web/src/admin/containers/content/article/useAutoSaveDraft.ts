import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import type { LocalDraft } from './types';
import { DraftStorage } from './draftStorage';

interface UseAutoSaveDraftProps {
  articleId: string;
  editable: boolean;
  draft: Omit<LocalDraft, 'updatedAt'>;
}

const draftStorage = new DraftStorage();

export function useAutoSaveDraft({ articleId, editable, draft }: UseAutoSaveDraftProps) {
  const location = useLocation();

  // Save before page unload
  useEffect(() => {
    if (!editable) {
      return;
    }
    const handleBeforeUnload = () => {
      draftStorage.saveDraft({ ...draft, articleId, updatedAt: Date.now() });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [articleId, draft, editable]);

  // Save draft on component unmount (e.g., route navigation)
  useEffect(() => {
    return () => {
      if (editable) {
        draftStorage.saveDraft({ ...draft, articleId, updatedAt: Date.now() });
      }
    };
  }, [articleId, location.pathname, draft,editable]);

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
