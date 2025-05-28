import { useCallback, useEffect, useState } from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCommonUtils } from '../../../commons/index.ts';
import { Page } from '../../../components/layout';
import { InfiniteScrollList } from '../../../components';
import { IUserData } from '../../../global/types.ts';
import * as UserService from '../../../services/UserService.ts';
import { FilterTabsWithCount } from '../../components';
import UserCard from './UserCard';
import UserCardSkeleton from './UserCardSkeleton';
import UserDetailDrawer from './UserDetailDrawer';

interface ILoadDataOption {
  status: string;
  keyword: string;
  emailVerified?: boolean;
  reset: boolean;
}

export default function UsersPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const DEFAULT_PAGE_SIZE = 12;
  const [users, setUsers] = useState<IUserData[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [selectedUserId, setSelectedUserId] = useState<number | string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [emailVerificationFilter, setEmailVerificationFilter] = useState<string>('');

  function loadData(option: ILoadDataOption): void {
    if (loading) return; // Prevent duplicate requests
    
    setLoading(true);
    const pageToLoad = option.reset ? 1 : current + 1;
    const emailVerified = option.emailVerified;
    
    UserService.getUsers(DEFAULT_PAGE_SIZE, pageToLoad - 1, option.keyword || undefined, emailVerified)
      .then(response => {
        const newUsers = response.data.records ?? [];
        
        setUsers(option.reset ? newUsers : users.concat(newUsers));
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
    const emailVerified = emailVerificationFilter === 'true' ? true : 
                         emailVerificationFilter === 'false' ? false : undefined;
    
    loadData({ 
      status: '', 
      keyword: searchKeyword, 
      emailVerified, 
      reset: true 
    });
  }, [searchKeyword, emailVerificationFilter]);

  // Scroll to top when component mounts
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  const handleDelete = useCallback((id: number | string): void => {
    UserService.deleteUser(id)
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
        setTotalCount(prev => prev - 1);
        enqueueSnackbar(t('user-table.delete-success'), { 
          variant: 'success' 
        });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { 
          variant: 'error' 
        });
      });
  }, [users, t, enqueueSnackbar]);

  const handleCardClick = useCallback((userId: number | string): void => {
    setSelectedUserId(userId);
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback((): void => {
    setDrawerOpen(false);
    setSelectedUserId(null);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(event.target.value);
  }, []);

  const renderUserCard = (user: IUserData) => (
    <UserCard
      key={user.id}
      user={user}
      onCardClick={handleCardClick}
    />
  );

  const renderSkeleton = () => <UserCardSkeleton />;

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
            placeholder={t('user-table.search-placeholder')}
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
        value={emailVerificationFilter}
        onChange={setEmailVerificationFilter}
        tabs={[
          { label: '全部', value: '' },
          { label: '已验证', value: 'true' },
          { label: '未验证', value: 'false' }
        ]}
        count={totalCount}
        countTooltip="找到的用户数量"
      />

      <InfiniteScrollList
        loading={loading}
        dataSource={users}
        renderItem={renderUserCard}
        renderSkeleton={renderSkeleton}
        hasMore={current < totalPage}
        loadMore={loadData}
        option={{ 
          status: '', 
          keyword: searchKeyword, 
          emailVerified: emailVerificationFilter === 'true' ? true : 
                         emailVerificationFilter === 'false' ? false : undefined,
          reset: false 
        }}
      />

      <UserDetailDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        userId={selectedUserId}
        onDelete={handleDelete}
      />
    </Page>
  );
}
