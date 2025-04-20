import { useParams } from 'react-router-dom';
import { EContentType } from '../../../global/enums';
import { PortalLayout } from '../../components';
import FunctionSection from '../../components/FunctionSection';

export default function TopicContentPage() {
  const { id } = useParams();
  return (
    <PortalLayout
      headerStyles={{ backgroundColor: 'transparent' }}
      bodyStyles={{ background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)' }}
    >
      <FunctionSection
        sx={{ marginTop: '120px' }}
        extraPanels={[]}
        ownerId={''}
        topic={id}
        availableContentTypes={[EContentType.Article, EContentType.Plan, EContentType.Vocabulary, EContentType.Collection]}
      />
    </PortalLayout>
  );
}
