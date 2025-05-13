import { useNavigate } from 'react-router-dom';
import { useCommonUtils } from '../../commons';
import { IBreadcrumbsNode, TopicPropsType } from '../../global/types';
import Breadcrumbs from './Breadcrumbs';

export default function ContentPageBreadcrumbsBar(props: Readonly<{ topic: TopicPropsType }>) {
  const { t } = useCommonUtils();
  const navigate = useNavigate();
  const breadcrumbs: IBreadcrumbsNode[] = [];

  if (props.topic) {
    breadcrumbs.push({
      label: t('breadcrumbs.topic'),
      onClick: () => navigate(`/topic/${props.topic}`),
    });
  }

  return <Breadcrumbs nodes={breadcrumbs} />;
}
