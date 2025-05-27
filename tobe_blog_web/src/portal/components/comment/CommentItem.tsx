import {
  Box,
  Typography,
  Collapse,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { ICommentDTO } from '../../../global/types';
import { useAuthState } from '../../../contexts';
import { ConfirmDialog } from '../../../components';
import * as CommentService from '../../../services/CommentService';
import CommentForm from './CommentForm';
import CommentHeader from './CommentHeader';
import CommentQuote from './CommentQuote';
import CommentActions from './CommentActions';

interface CommentItemProps {
  readonly comment: ICommentDTO;
  readonly onCommentDeleted: (commentId: number) => void;
  readonly onReplyCreated: (comment: ICommentDTO) => void;
}

export default function CommentItem({
  comment,
  onCommentDeleted,
  onReplyCreated,
}: CommentItemProps) {
  const { t } = useTranslation();
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(comment.likeCount);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  
  const { user } = useAuthState();

  const handleLike = async () => {
    if (!user) {
      enqueueSnackbar(t('comments.errors.sign-in-required', { action: t('comments.item.like').toLowerCase() }), { variant: 'warning' });
      return;
    }

    try {
      const newLiked = !liked;
      const response = await CommentService.toggleCommentLike(comment.id, newLiked);
      setLiked(newLiked);
      setLikeCount(response.data);
      
      const message = newLiked 
        ? t('comments.actions.like-success')
        : t('comments.actions.unlike-success');
      enqueueSnackbar(message, { variant: 'success' });
    } catch (error: any) {
      console.error('Failed to toggle like:', error);
      enqueueSnackbar(t('comments.errors.like-failed'), { variant: 'error' });
    }
  };

  const handleReply = () => {
    if (!user) {
      enqueueSnackbar(t('comments.errors.sign-in-required', { action: t('comments.item.reply').toLowerCase() }), { variant: 'warning' });
      return;
    }
    setShowReplyForm(true);
  };

  const handleReplyCreated = (newReply: ICommentDTO) => {
    onReplyCreated(newReply);
    setShowReplyForm(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await CommentService.deleteComment(comment.id);
      onCommentDeleted(comment.id);
      enqueueSnackbar(t('comments.actions.delete-success'), { variant: 'success' });
    } catch (error: any) {
      console.error('Failed to delete comment:', error);
      enqueueSnackbar(t('comments.errors.delete-failed'), { variant: 'error' });
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const canDelete = user && (user.id === comment.userId || user.roles?.includes('ADMIN'));

  return (
    <Box sx={{ mb: 3 }}>
      <CommentHeader
        userName={comment.userName}
        userAvatarUrl={comment.userAvatarUrl}
        createTime={comment.createTime}
        canDelete={canDelete}
        onDeleteClick={handleDeleteClick}
      />
      
      <Box sx={{ ml: 7 }}>
        {/* Reply Quote */}
        {comment.replyToUserName && comment.replyToContent && (
          <CommentQuote
            replyToUserName={comment.replyToUserName}
            replyToContent={comment.replyToContent}
          />
        )}
        
        {/* Comment Content */}
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 0.5, 
            mb: 2,
            lineHeight: 1.6,
            color: 'text.primary',
            fontSize: '0.95rem'
          }}
        >
          {comment.content}
        </Typography>
        
        {/* Comment Actions */}
        <CommentActions
          liked={liked}
          likeCount={likeCount}
          onLike={handleLike}
          onReply={handleReply}
        />
        
        {/* Reply Form */}
        <Collapse in={showReplyForm}>
          <Box sx={{ mt: 3, pl: 2, borderLeft: '2px solid', borderLeftColor: 'grey.200' }}>
            <CommentForm
              contentId={comment.contentId}
              contentType={comment.contentType}
              parentId={comment.id}
              placeholder={t('comments.form.reply-placeholder', { userName: comment.userName })}
              onCommentCreated={handleReplyCreated}
              onCancel={() => setShowReplyForm(false)}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={t('comments.menu.delete-confirm')}
        content={t('comments.menu.delete-confirm-content')}
        confirmText={t('comments.item.delete')}
        cancelText={t('dialog.cancel')}
      />
      
      <Divider sx={{ mt: 3, opacity: 0.6 }} />
    </Box>
  );
} 