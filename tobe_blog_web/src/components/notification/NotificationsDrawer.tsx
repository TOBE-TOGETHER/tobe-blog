import { useCallback, useEffect, useState } from 'react';
import { 
  Typography, 
  Button, 
  Box, 
  List, 
} from '@mui/material';
import { useCommonUtils } from '../../commons';
import { INotificationDTO } from '../../global/types';
import * as NotificationService from '../../services/NotificationService';
import NotificationCard from './NotificationCard.tsx';
import NotificationCardSkeleton from './NotificationCardSkeleton.tsx';
import InfiniteScrollList from '../common/InfiniteScrollList.tsx';
import BaseDrawer from '../common/BaseDrawer.tsx';
import FilterTabsWithCount from '../common/FilterTabsWithCount.tsx';

interface ILoadDataOption {
  isRead?: boolean;
  reset: boolean;
}

interface INotificationsDrawerProps {
  open: boolean;
  onClose: () => void;
  onUnreadCountUpdate?: () => void;
}

export default function NotificationsDrawer({ open, onClose, onUnreadCountUpdate }: INotificationsDrawerProps) {
  const { t, enqueueSnackbar } = useCommonUtils();
  
  const [notifications, setNotifications] = useState<INotificationDTO[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [readFilter, setReadFilter] = useState<string>('');
  const [markingAllRead, setMarkingAllRead] = useState<boolean>(false);

  const DEFAULT_PAGE_SIZE = 24;

  function loadData(option: ILoadDataOption): void {
    if (loading) return; // Prevent duplicate requests
    
    setLoading(true);
    const pageToLoad = option.reset ? 1 : current + 1;
    const isRead = option.isRead;
    
    NotificationService.getUserNotifications(pageToLoad, DEFAULT_PAGE_SIZE, isRead)
      .then(response => {
        const newNotifications = response.data.records ?? [];
        
        setNotifications(option.reset ? newNotifications : notifications.concat(newNotifications));
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
    if (open) {
      const isRead = readFilter === 'true' ? true : 
                     readFilter === 'false' ? false : undefined;
      
      loadData({ 
        isRead, 
        reset: true 
      });
    }
  }, [readFilter, open]);

  const handleMarkAsRead = useCallback((notificationId: number): void => {
    NotificationService.markAsRead(notificationId)
      .then(() => {
        setNotifications(notifications.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
        ));
        setTimeout(() => {
          onUnreadCountUpdate?.();
        }, 100);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { 
          variant: 'error' 
        });
      });
  }, [notifications, t, enqueueSnackbar, onUnreadCountUpdate]);

  const handleMarkAllAsRead = useCallback((): void => {
    setMarkingAllRead(true);
    NotificationService.markAllAsRead()
      .then(() => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        enqueueSnackbar(t('notifications.mark-all-read-success'), { 
          variant: 'success' 
        });
        setTimeout(() => {
          onUnreadCountUpdate?.();
        }, 100);
      })
      .catch(() => {
        enqueueSnackbar(t('msg.error'), { 
          variant: 'error' 
        });
      })
      .finally(() => {
        setMarkingAllRead(false);
      });
  }, [notifications, t, enqueueSnackbar, onUnreadCountUpdate]);

  const handleReadFilterChange = useCallback((newIsRead: string) => {
    setReadFilter(newIsRead);
  }, []);

  const renderNotificationCard = (notification: INotificationDTO) => (
    <NotificationCard
      key={notification.id}
      notification={notification}
      onMarkAsRead={handleMarkAsRead}
    />
  );

  const renderSkeleton = () => <NotificationCardSkeleton />;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Action buttons for the drawer
  const renderActionButtons = () => {
    if (unreadCount === 0) return null;
    
    return (
      <Button
        variant="contained"
        onClick={handleMarkAllAsRead}
        disabled={markingAllRead}
        fullWidth
        sx={{
          borderRadius: 1.5,
          fontWeight: 600,
          textTransform: 'none',
          py: 1.5,
        }}
      >
        {markingAllRead ? t('notifications.marking-all-read') : t('notifications.mark-all-read')}
      </Button>
    );
  };

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={t('notifications.title')}
      width={{ xs: '100%', sm: 420, md: 480 }}
      actionButtons={renderActionButtons()}
    >
      {/* Tabs and Count */}
      <Box sx={{ mb: 3 }}>
        <FilterTabsWithCount
          value={readFilter}
          onChange={handleReadFilterChange}
          tabs={[
            { label: t('notifications.tabs.all'), value: '' },
            { label: t('notifications.tabs.unread'), value: 'false' },
            { label: t('notifications.tabs.read'), value: 'true' }
          ]}
          count={totalCount}
          countTooltip={t('notifications.count-tooltip')}
        />
      </Box>

      {/* Notifications List */}
      <Box sx={{ 
        height: 'calc(100vh - 200px)', // Adjust height to account for header and action buttons
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        mx: -3, // Negative margin to extend to drawer edges
      }}>
        {totalCount === 0 && !loading ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              px: 3,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {t('notifications.no-notifications')}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <List sx={{ p: 0 }}>
              <InfiniteScrollList
                loading={loading}
                dataSource={notifications}
                renderItem={renderNotificationCard}
                renderSkeleton={renderSkeleton}
                hasMore={current < totalPage}
                loadMore={loadData}
                option={{ 
                  isRead: readFilter === 'true' ? true : 
                         readFilter === 'false' ? false : undefined,
                  reset: false 
                }}
              />
            </List>
          </Box>
        )}
      </Box>
    </BaseDrawer>
  );
} 