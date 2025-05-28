import { useCallback, useEffect, useState } from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCommonUtils } from '../../../commons/index.ts';
import { Page } from '../../../components/layout';
import { InfiniteScrollList } from '../../../components';
import { IBaseUserContentDTO } from '../../../global/types.ts';
import * as ContentAdminService from './ContentAdminService.ts';
import { GeneralCard } from '../content/components/GeneralCard';
import { GeneralCardSkeleton } from '../content/components/GeneralCardSkeleton';
import { FilterTabsWithCount } from '../../components';
import ContentDetailDrawer from './ContentDetailDrawer';

interface ILoadDataOption {
  status: string;
  keyword: string;
  reset: boolean;
}

export default function ContentAdminPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const DEFAULT_PAGE_SIZE = 12;
  const [contents, setContents] = useState<IBaseUserContentDTO[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedContent, setSelectedContent] = useState<IBaseUserContentDTO | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  function loadData(option: ILoadDataOption): void {
    if (loading) return; // Prevent duplicate requests
    
    setLoading(true);
    const pageToLoad = option.reset ? 1 : current + 1;
    
    ContentAdminService.getContents(
      DEFAULT_PAGE_SIZE, 
      pageToLoad - 1, 
      option.keyword || undefined, 
      option.status || undefined
    )
      .then(response => {
        const newContents = response.data.records ?? [];
        
        setContents(option.reset ? newContents : contents.concat(newContents));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
        setTotalCount(response.data.total);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadData({ 
      status: statusFilter, 
      keyword: searchKeyword, 
      reset: true 
    });
  }, [searchKeyword, statusFilter]);

  // Scroll to top when component mounts
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  const handleBan = useCallback((id: number | string): void => {
    setContents(contents.map(c => 
      c.id === id ? { ...c, banned: true } : c
    ));
    if (selectedContent && selectedContent.id === id) {
      setSelectedContent({ ...selectedContent, banned: true });
    }
  }, [contents, selectedContent]);

  const handleUnban = useCallback((id: number | string): void => {
    setContents(contents.map(c => 
      c.id === id ? { ...c, banned: false } : c
    ));
    if (selectedContent && selectedContent.id === id) {
      setSelectedContent({ ...selectedContent, banned: false });
    }
  }, [contents, selectedContent]);

  const handleRecommend = useCallback((id: number | string): void => {
    setContents(contents.map(c => 
      c.id === id ? { ...c, recommended: true } : c
    ));
    if (selectedContent && selectedContent.id === id) {
      setSelectedContent({ ...selectedContent, recommended: true });
    }
  }, [contents, selectedContent]);

  const handleUnrecommend = useCallback((id: number | string): void => {
    setContents(contents.map(c => 
      c.id === id ? { ...c, recommended: false } : c
    ));
    if (selectedContent && selectedContent.id === id) {
      setSelectedContent({ ...selectedContent, recommended: false });
    }
  }, [contents, selectedContent]);

  const handleCardClick = useCallback((contentId: number | string): void => {
    setSelectedContent(contents.find(c => c.id === contentId) || null);
    setDrawerOpen(true);
  }, [contents]);

  const handleDrawerClose = useCallback((): void => {
    setDrawerOpen(false);
    setSelectedContent(null);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(event.target.value);
  }, []);

  const renderContentCard = (content: IBaseUserContentDTO) => (
    <GeneralCard
      key={content.id}
      record={content}
      onClick={handleCardClick}
    />
  );

  const renderSkeleton = () => <GeneralCardSkeleton />;

  return (
    <Page
      pageTitle=""
      openLoading={false}
    >
      {/* Header with Search */}
      <Grid
        container
        sx={{ py: 1 }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Grid item sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            placeholder={t('content-admin.search-placeholder')}
            variant="outlined"
            size="small"
            value={searchKeyword}
            onChange={handleSearchChange}
            sx={{ 
              width: { xs: '100%', sm: 285 },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '4px',
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.24)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Tabs and Count */}
      <FilterTabsWithCount
        value={statusFilter}
        onChange={setStatusFilter}
        tabs={[
          { label: t('content-admin.tabs.all'), value: '' },
          { label: t('content-admin.tabs.banned'), value: 'banned' },
          { label: t('content-admin.tabs.recommended'), value: 'recommended' }
        ]}
        count={totalCount}
        countTooltip={t('content-admin.total-count-tooltip')}
      />

      <InfiniteScrollList
        loading={loading}
        dataSource={contents}
        renderItem={renderContentCard}
        renderSkeleton={renderSkeleton}
        hasMore={current < totalPage}
        loadMore={loadData}
        option={{ 
          status: statusFilter, 
          keyword: searchKeyword, 
          reset: false 
        }}
      />

      <ContentDetailDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        content={selectedContent}
        onBan={handleBan}
        onUnban={handleUnban}
        onRecommend={handleRecommend}
        onUnrecommend={handleUnrecommend}
      />
    </Page>
  );
}
