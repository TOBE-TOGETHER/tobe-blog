import { useState, useCallback } from 'react';
import { useCommonUtils } from '../../../../commons';
import { Page } from '../../../../components/layout';
import { FilterTabsWithCount } from '../../../components';
import { ITagOption } from '../../../../global/types';
import BaseContentService from '../BaseContentService';
import GeneralCardView from './GeneralCardView';
import GeneralContentListPageFunctionBar from './GeneralContentListPageFunctionBar';

export default function GeneralContentListPage(
  props: Readonly<{
    contentService: BaseContentService;
    pageTitle: string;
    detailPageURL: string;
    createPageURL: string;
  }>
) {
  const { t, navigate } = useCommonUtils();
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [recordFound, setRecordFound] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(event.target.value);
  }, []);

  return (
    <Page
      openLoading={false}
      pageTitle={props.pageTitle}
    >
      <GeneralContentListPageFunctionBar
        createNewAction={() => navigate(props.createPageURL)}
        tagValues={tagValues}
        setTagValues={setTagValues}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
      />

      <FilterTabsWithCount
        value={status}
        onChange={setStatus}
        tabs={[
          { label: t('contents-page.filter.all'), value: '' },
          { label: t('contents-page.filter.published'), value: 'PUBLISHED' },
          { label: t('contents-page.filter.draft'), value: 'DRAFT' },
        ]}
        count={recordFound}
        countTooltip={t('contents-page.record-found')}
      />
      <GeneralCardView
        contentService={props.contentService}
        status={status}
        tagValues={tagValues}
        keyword={searchKeyword}
        setRecordFound={setRecordFound}
        onClick={(id: number | string) => navigate(props.detailPageURL.replace(':id', id.toString()))}
      />
    </Page>
  );
}
