import { BaseDrawer } from '../../../../admin/components';
import { useCommonUtils } from '../../../../commons';
import { ReactNode } from 'react';

interface ContentNavDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ContentNavDrawer({ open, onClose, children }: ContentNavDrawerProps) {
  const { t } = useCommonUtils();
  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={t('article-reading-page.content-nav')}
    >
      {children}
    </BaseDrawer>
  );
} 