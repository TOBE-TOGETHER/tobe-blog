import { useTranslation } from 'react-i18next';
import { GeneralCardData, IBaseUserContentDTO } from '../../../../global/types.ts';
import { CollectionService } from '../../../../services';
import { URL } from '../../../URL.ts';
import GeneralContentListPage from '../components/GeneralContentListPage.tsx';

export default function CollectionsPage() {
  const { t } = useTranslation();
  
   function convertToGeneralCardData(data: IBaseUserContentDTO[]): GeneralCardData[] {
    return data.map((d) => {
      return {
        id: d.id,
        title: d.title,
        description: d.description,
        publicToAll: d.publicToAll,
        tags: d.tags,
        createTime: d.createTime
      };
    });
  }
  return (
    <GeneralContentListPage
      domainService={CollectionService}
      pageTitle={t('collections-page.page-main-title')}
      detailPageURL={URL.COLLECTION_DETAIL}
      createPageURL={URL.CREATE_COLLECTION}
      dataConverter={convertToGeneralCardData}
    />
  );
}
