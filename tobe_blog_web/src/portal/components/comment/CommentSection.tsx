import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  Pagination,
  Link,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IBaseUserContentDTO, ICommentsPageDTO } from '../../../global/types';
import { useAuthState } from '../../../contexts';
import * as CommentService from '../../../services/CommentService';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  readonly content: IBaseUserContentDTO;
}

export default function CommentSection({ content }: CommentSectionProps) {
  const { t } = useTranslation();
  const [comments, setComments] = useState<ICommentsPageDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const { user } = useAuthState();
  const navigate = useNavigate();

  const loadComments = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await CommentService.getComments(
        content.id,
        content.contentType,
        page,
        pageSize
      );
      setComments(response.data);
    } catch (error: any) {
      console.error('Failed to load comments:', error);
      setError(t('comments.errors.load-failed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments(currentPage);
  }, [content.id, content.contentType, currentPage]);

  const handleCommentCreated = () => {
    // When a new comment is created, always go to first page to show the latest comment
    if (currentPage !== 1) {
      setCurrentPage(1);
      // The useEffect will trigger loadComments when currentPage changes
    } else {
      // If already on first page, just reload to get the latest data
      loadComments(1);
    }
  };

  const handleCommentDeleted = (commentId: number) => {
    if (comments) {
      // Remove comment from flat list
      const filteredComments = comments.records.filter((comment) => comment.id !== commentId);
      const updatedComments = {
        ...comments,
        records: filteredComments,
        total: comments.total - 1,
      };
      setComments(updatedComments);
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          component="h3" 
          color="textSecondary"
          sx={{ 
            fontWeight: 400,
            mb: 1,
            fontSize: '1.5rem'
          }}
        >
          {t('comments.section.title')} 
          <Typography 
            component="span" 
            variant="h6" 
            sx={{ 
              ml: 1, 
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: '1.1rem'
            }}
          >
            ({comments?.total ?? 0})
          </Typography>
        </Typography>
        
        <Divider sx={{ mb: 1 }} />
      </Box>

      {/* Comment Form */}
      {user ? (
        <Box sx={{ mb: 4 }}>
          <CommentForm
            contentId={content.id}
            contentType={content.contentType}
            onCommentCreated={handleCommentCreated}
          />
        </Box>
      ) : (
        <Box 
          sx={{ 
            mb: 4, 
            p: 3, 
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
            borderRadius: '12px',
            border: '1px solid rgba(25, 118, 210, 0.12)',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontWeight: 500,
              fontSize: '0.95rem',
            }}
          >
            {t('comments.section.sign-in-prompt')}
            <Link
              component="button"
              variant="body1"
              onClick={() => navigate('/sign-in')}
              sx={{
                mx: 0.5,
                mb: 0.5,
                color: 'primary.main',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {t('comments.section.sign-in-link')}
            </Link>
            {t('comments.section.to-comment')}
          </Typography>
        </Box>
      )}

      {/* Comments List */}
      {loading && (
        <Box 
          display="flex" 
          flexDirection="column"
          alignItems="center" 
          sx={{ my: 6 }}
        >
          <CircularProgress size={32} sx={{ mb: 2 }} />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: '0.9rem' }}
          >
            {t('comments.section.loading')}
          </Typography>
        </Box>
      )}

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: '12px',
            '& .MuiAlert-message': {
              fontSize: '0.9rem'
            }
          }}
        >
          {error}
        </Alert>
      )}

      {comments && !loading && comments.records.length > 0 && (
        <Box>
          {comments.records.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onCommentDeleted={handleCommentDeleted}
              onReplyCreated={handleCommentCreated}
            />
          ))}
          
          {/* Pagination */}
          {comments.pages > 1 && (
            <Box 
              display="flex" 
              justifyContent="center" 
              sx={{ 
                mt: 4,
                pt: 3,
              }}
            >
              <Pagination
                count={comments.pages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '8px',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.08)'
                    }
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
} 