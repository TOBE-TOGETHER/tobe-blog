import { EContentType } from '../../../global/enums';
import { PortalLayout } from '../../components';
import FunctionSection from './FunctionSection';
import GreatingSection from './GreatingSection';
import Top5ActiveUsersPanel from './Top5ActiveUsersPanel';

export default function Home() {
  return (
    <PortalLayout>
      <GreatingSection />
      <FunctionSection
        extraPanels={[<Top5ActiveUsersPanel key="top-5-active-user-panel" />]}
        ownerId={''}
        availableContentTypes={[EContentType.Article, EContentType.Plan, EContentType.Vocabulary, EContentType.Collection]}
      />
    </PortalLayout>
  );
}
