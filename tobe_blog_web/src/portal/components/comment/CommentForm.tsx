import {
  Box,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { useState, useRef } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { ICommentDTO } from '../../../global/types';
import { useAuthState } from '../../../contexts';
import * as CommentService from '../../../services/CommentService';
import EmojiPicker from './EmojiPicker';

interface CommentFormProps {
  readonly contentId: string;
  readonly contentType: string;
  readonly parentId?: number;
  readonly placeholder?: string;
  readonly onCommentCreated: (comment: ICommentDTO) => void;
  readonly onCancel?: () => void;
}

export default function CommentForm({
  contentId,
  contentType,
  parentId,
  placeholder,
  onCommentCreated,
  onCancel,
}: CommentFormProps) {
  const { t } = useTranslation();
  const [content, setContent] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { user } = useAuthState();
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  // Determine placeholder text
  const getPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }
    return parentId ? t('comments.form.reply-placeholder', { userName: '' }) : t('comments.form.placeholder');
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textFieldRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.slice(0, start) + emoji + content.slice(end);
      setContent(newContent);
      
      // 设置光标位置到表情后面
      setTimeout(() => {
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
        textarea.focus();
      }, 0);
    } else {
      // 如果无法获取光标位置，就添加到末尾
      setContent(prev => prev + emoji);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!content.trim()) {
      enqueueSnackbar(t('comments.errors.empty-content'), { variant: 'warning' });
      return;
    }

    if (!user) {
      enqueueSnackbar(t('comments.errors.sign-in-required', { action: t('comments.item.reply').toLowerCase() }), { variant: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      const response = await CommentService.createComment({
        contentId,
        contentType,
        content: content.trim(),
        parentId: parentId ?? undefined,
      });
      
      onCommentCreated(response.data);
      setContent('');
      
      const successMessage = parentId 
        ? t('comments.actions.reply-success')
        : t('comments.actions.create-success');
      enqueueSnackbar(successMessage, { variant: 'success' });
      
      if (onCancel) {
        onCancel();
      }
    } catch (error: any) {
      console.error('Failed to create comment:', error);
      enqueueSnackbar(t('comments.errors.create-failed'), { variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        multiline
        rows={parentId ? 2 : 3}
        placeholder={getPlaceholder()}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        size="small"
        disabled={submitting}
        inputRef={textFieldRef}
        sx={{ 
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            '&.Mui-focused': {
              backgroundColor: 'white',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            },
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1px',
            }
          },
          '& .MuiInputBase-input': {
            fontSize: '0.95rem',
            lineHeight: 1.5,
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 0.7
            }
          }
        }}
      />
      
      <Box display="flex" gap={1.5} justifyContent="space-between" alignItems="center">
        {/* Empty space for left alignment */}
        <Box />
        
        {/* Action Buttons */}
        <Box display="flex" gap={1.5} alignItems="center">
          {/* Emoji Picker */}
          <EmojiPicker 
            onEmojiSelect={handleEmojiSelect}
            disabled={submitting}
          />
          
          {onCancel && (
            <Button
              variant="outlined"
              size="small"
              onClick={onCancel}
              disabled={submitting}
              sx={{
                borderRadius: '20px',
                px: 2,
                py: 0.75,
                fontSize: '0.85rem',
                borderColor: 'grey.300',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'grey.400',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              {t('comments.form.cancel')}
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={submitting ?? !content.trim()}
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              borderRadius: '20px',
              px: 3,
              py: 0.75,
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
              },
              '&:disabled': {
                backgroundColor: 'grey.300',
                color: 'grey.500'
              }
            }}
          >
            {submitting ? t('comments.form.submitting') : t('comments.form.submit')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
} 