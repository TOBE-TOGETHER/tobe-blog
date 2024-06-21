import { EContentType } from '../../../global/enums';
import { FrontendLayout } from '../../components';
import FunctionSection from './FunctionSection';
import GreatingSection from './GreatingSection';
import Top5ActiveUsersPanel from './Top5ActiveUsersPanel';

export default function Home() {
  return (
    <FrontendLayout>
      <GreatingSection />
      <FunctionSection
        extraPanels={[<Top5ActiveUsersPanel />]}
        ownerId={""}
        availableContentTypes={[EContentType.Article, EContentType.Plan, EContentType.Vocabulary, EContentType.Collection]}
      />
    </FrontendLayout>
  );
}
