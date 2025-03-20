import { EContentType } from '../../../global/enums';
import { PortalLayout } from '../../components';
import FunctionSection from './FunctionSection';
import GreatingSection from './GreatingSection';
import Top5ActiveUsersPanel from './Top5ActiveUsersPanel';

export default function Home() {
  return (
    <PortalLayout headerStyles={{backgroundColor: 'transparent'}} bodyStyles={{background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)',}}>
      <GreatingSection />
      <FunctionSection
        extraPanels={[<Top5ActiveUsersPanel key="top-5-active-user-panel" />]}
        ownerId={''}
        availableContentTypes={[EContentType.Article, EContentType.Plan, EContentType.Vocabulary, EContentType.Collection]}
      />
    </PortalLayout>
  );
}
