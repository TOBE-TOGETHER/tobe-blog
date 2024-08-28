import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../../components/layout';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [status, setStatus] = useState<string>('');
  return (
    <Page
      openLoading={openLoading}
      pageTitle={props.pageTitle}
    >
      <GeneralContentListPageFunctionBar
        createNewAction={() => navigate(props.createPageURL)}
        tagValues={tagValues}
        setTagValues={setTagValues}
      />
      <Box sx={{ mb: 1, width: '100%' }}>
        <Tabs
          value={status}
          onChange={(_, v: string) => setStatus(v)}
        >
          <Tab
            disableRipple
            label={t('contents-page.filter.all')}
            value=""
          />
          <Tab
            disableRipple
            label={t('contents-page.filter.published')}
            value="PUBLISHED"
          />
          <Tab
            disableRipple
            label={t('contents-page.filter.draft')}
            value="DRAFT"
          />
        </Tabs>
      </Box>
      <GeneralCardView
        loading={openLoading}
        setLoading={setOpenLoading}
        contentService={props.contentService}
        status={status}
        tagValues={tagValues}
        onClick={(id: number | string) => navigate(props.detailPageURL.replace(':id', id.toString()))}
      />
    </Page>
  );
}
