import { useCallback, useEffect, useState } from 'react';
import { Typography, Grid, Tab, Tabs, Tooltip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCommonUtils } from '../../../commons/index.ts';
import { Page } from '../../../components/layout';
import { InfiniteScrollList } from '../../../components';
import { IUserData } from '../../../global/types';
import * as UserService from '../../../services/UserService.ts';
import UserCard from './UserCard';
import UserCardSkeleton from './UserCardSkeleton';
import UserDetailDrawer from './UserDetailDrawer';

export default function UsersPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [current, setCurrent] = useState<number>(0);
  const [size] = useState<number>(12);
  const [users, setUsers] = useState<IUserData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<number | string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [emailVerificationFilter, setEmailVerificationFilter] = useState<string>(''); // '', 'true', 'false'

  const loadUserData = useCallback((
    isLoadMore: boolean = false,
    keyword?: string,
    emailVerified?: boolean
  ): void => {
    if (loading) return;
    
    setLoading(true);
    const pageToLoad = isLoadMore ? current + 1 : 0;
    
    UserService.getUsers(size, pageToLoad, keyword, emailVerified)
      .then(response => {
        const newUsers = response.data.records ?? [];
        const total = response.data.total;
        
        if (isLoadMore) {
          setUsers(prevUsers => [...prevUsers, ...newUsers]);
          setCurrent(pageToLoad);
        } else {
          setUsers(newUsers);
          setCurrent(0);
        }
        
        setTotalCount(total);
        setHasMore((pageToLoad + 1) * size < total);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [current, size, loading, t, enqueueSnackbar]);

  useEffect(() => {
    const emailVerified = emailVerificationFilter === 'true' ? true : 
                         emailVerificationFilter === 'false' ? false : undefined;
    
    setUsers([]);
    setCurrent(0);
    setHasMore(true);
    loadUserData(false, searchKeyword, emailVerified);
  }, [searchKeyword, emailVerificationFilter]);

  // Scroll to top when component mounts
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  const handleLoadMore = useCallback((): void => {
    const emailVerified = emailVerificationFilter === 'true' ? true : 
                         emailVerificationFilter === 'false' ? false : undefined;
    loadUserData(true, searchKeyword, emailVerified);
  }, [loadUserData, searchKeyword, emailVerificationFilter]);

  const handleDelete = useCallback((id: number | string): void => {
    UserService.deleteUser(id)
      .then(() => {
        const emailVerified = emailVerificationFilter === 'true' ? true : 
                             emailVerificationFilter === 'false' ? false : undefined;
        
        setUsers([]);
        setCurrent(0);
        setHasMore(true);
        loadUserData(false, searchKeyword, emailVerified);
        enqueueSnackbar(t('user-table.delete-success'), { 
          variant: 'success' 
        });
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { 
          variant: 'error' 
        });
      });
  }, [loadUserData, t, enqueueSnackbar, searchKeyword, emailVerificationFilter]);

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
      <Grid
        sx={{ mb: 1, width: '100%' }}
        container
        justifyContent="space-between"
      >
        <Grid item>
          <Tabs
            value={emailVerificationFilter}
            onChange={(_, v: string) => setEmailVerificationFilter(v)}
          >
            <Tab
              disableRipple
              label="全部"
              value=""
            />
            <Tab
              disableRipple
              label="已验证"
              value="true"
            />
            <Tab
              disableRipple
              label="未验证"
              value="false"
            />
          </Tabs>
        </Grid>
        <Grid
          item
          alignSelf="center"
          px={2}
        >
          <Tooltip title="找到的用户数量">
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ fontWeight: 800 }}
            >
              {totalCount}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>

      <InfiniteScrollList
        loading={loading}
        dataSource={users}
        renderItem={renderUserCard}
        renderSkeleton={renderSkeleton}
        hasMore={hasMore}
        loadMore={handleLoadMore}
        option={{}}
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
