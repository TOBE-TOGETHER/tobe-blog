import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL parameters
  const paramTags: string = searchParams.get('tags') ?? '';
  const paramKeyword: string = searchParams.get('keyword') ?? '';
  const paramStatus: string = searchParams.get('status') ?? '';
  
  const initialTags = paramTags
    ? paramTags.split(',').map(tagId => ({ 
        value: tagId, 
        label: `Tag ${tagId}` // This will be updated when tags are loaded
      }))
    : [];
  
  const [tagValues, setTagValues] = useState<ITagOption[]>(initialTags);
  const [recordFound, setRecordFound] = useState<number>(0);
  const [status, setStatus] = useState<string>(paramStatus);
  const [searchKeyword, setSearchKeyword] = useState<string>(paramKeyword);

  // Update URL when state changes
  const updateURL = useCallback((newTags: ITagOption[], newKeyword: string, newStatus: string) => {
    const params = new URLSearchParams();
    
    if (newTags.length > 0) {
      params.set('tags', newTags.map(tag => tag.value).join(','));
    }
    if (newKeyword.trim()) {
      params.set('keyword', newKeyword.trim());
    }
    if (newStatus) {
      params.set('status', newStatus);
    }
    
    setSearchParams(params);
  }, [setSearchParams]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const newKeyword = event.target.value;
    setSearchKeyword(newKeyword);
    updateURL(tagValues, newKeyword, status);
  }, [tagValues, status, updateURL]);

  const handleTagsChange = useCallback((newTags: ITagOption[]) => {
    setTagValues(newTags);
    updateURL(newTags, searchKeyword, status);
  }, [searchKeyword, status, updateURL]);

  const handleStatusChange = useCallback((newStatus: string) => {
    setStatus(newStatus);
    updateURL(tagValues, searchKeyword, newStatus);
  }, [tagValues, searchKeyword, updateURL]);

  return (
    <Page
      openLoading={false}
      pageTitle={props.pageTitle}
    >
      <GeneralContentListPageFunctionBar
        createNewAction={() => navigate(props.createPageURL)}
        tagValues={tagValues}
        setTagValues={handleTagsChange}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
      />

      <FilterTabsWithCount
        value={status}
        onChange={handleStatusChange}
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
