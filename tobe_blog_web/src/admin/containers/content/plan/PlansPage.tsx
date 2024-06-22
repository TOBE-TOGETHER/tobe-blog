import { useTranslation } from 'react-i18next';
import { GeneralCardData, PlanInfo, } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PlanService } from '../../../../services';

import GeneralContentListPage from '../components/GeneralContentListPage';

export default function PlansPage() {
    const {t} = useTranslation();

    function convertToGeneralCardData(data: PlanInfo[]): GeneralCardData[] {
        return data.map((d) => {
            return {
                id: d.id,
                title: d.title,
                description: d.description,
                publicToAll: d.publicToAll,
                coverImgUrl: d.coverImgUrl,
                tags: d.tags,
                createTime: d.createTime,
                viewCount: d.viewCount,
                likeCount: d.likeCount
            };
        });
    }

    return (
        <GeneralContentListPage
            domainService={PlanService}
            pageTitle={t('plans-page.page-main-title')}
            detailPageURL={URL.PLAN_DETAIL}
            createPageURL={URL.CREATE_PLAN}
            dataConverter={convertToGeneralCardData}
        />
    );
}
