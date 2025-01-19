import { Grid, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useCommonUtils } from '../../../../commons';
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
  const { t, navigate } = useCommonUtils();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [tagValues, setTagValues] = useState<ITagOption[]>([]);
  const [recordFound, setRecordFound] = useState<number>(0);
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
      <Grid
        sx={{ mb: 1, width: '100%' }}
        container
        justifyContent="space-between"
      >
        <Grid item>
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
        </Grid>
        <Grid
          item
          alignSelf="center"
          px={2}
        >
          <Tooltip title={t('contents-page.record-found')}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: 800 }}
            >
              {recordFound}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
      <GeneralCardView
        loading={openLoading}
        setLoading={setOpenLoading}
        contentService={props.contentService}
        status={status}
        tagValues={tagValues}
        setRecordFound={setRecordFound}
        onClick={(id: number | string) => navigate(props.detailPageURL.replace(':id', id.toString()))}
      />
    </Page>
  );
}
