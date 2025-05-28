import {
  Box,
  IconButton,
  Popover,
  Typography,
  Grid,
} from '@mui/material';
import {
    EmojiEmotionsRounded,
} from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface EmojiPickerProps {
  readonly onEmojiSelect: (emoji: string) => void;
  readonly disabled?: boolean;
}

// 常用表情列表
const EMOJI_LIST = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
  '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
  '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
  '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
  '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨',
  '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥',
  '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧',
  '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
  '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑',
  '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻',
  '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸',
  '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👋',
  '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️',
  '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕',
  '👇', '☝️', '👍', '👎', '👊', '✊', '🤛', '🤜',
  '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅',
  '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻',
  '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️',
  '👅', '👄', '💋', '🩸', '❤️', '🧡', '💛', '💚',
  '💙', '💜', '🤎', '🖤', '🤍', '💔', '❣️', '💕',
  '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
  '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️'
];

export default function EmojiPicker({ onEmojiSelect, disabled = false }: EmojiPickerProps) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={disabled}
        size="medium"
        sx={{
          color: 'text.secondary',
          height: '32px',
          width: '32px',
          borderRadius: '20px',
          backgroundColor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          '&:hover': {
            backgroundColor: 'grey.200',
            color: 'text.primary'
          },
          '&:disabled': {
            color: 'grey.400',
            backgroundColor: 'grey.50'
          }
        }}
        title={t('comments.form.add-emoji')}
      >
        <EmojiEmotionsRounded fontSize="large" color="primary" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            maxWidth: '320px',
            maxHeight: '400px',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {t('comments.form.select-emoji')}
          </Typography>
          
          <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '3px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
              },
            }}
          >
            <Grid container spacing={0.5}>
              {EMOJI_LIST.map((emoji, index) => (
                <Grid item key={index}>
                  <IconButton
                    onClick={() => handleEmojiClick(emoji)}
                    sx={{
                      width: '36px',
                      height: '36px',
                      fontSize: '18px',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {emoji}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Popover>
    </>
  );
} 