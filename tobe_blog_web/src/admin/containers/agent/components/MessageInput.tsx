import React, { useRef } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useCommonUtils } from '../../../../commons';

interface MessageInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSend: () => void;
  readonly onCancel?: () => void;
  readonly loading?: boolean;
  readonly disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  value, 
  onChange, 
  onSend, 
  onCancel, 
  loading, 
  disabled 
}) => {
  const { t } = useCommonUtils();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = () => {
    if (loading && onCancel) {
      onCancel();
    } else if (!loading && !disabled && value.trim()) {
      onSend();
    }
  };

  const getButtonText = () => {
    if (loading) {
      return onCancel ? t('agent-page.cancel') : t('agent-page.sending');
    }
    return t('agent-page.send');
  };

  const getButtonColor = () => {
    if (loading && onCancel) {
      return 'error';
    }
    return 'primary';
  };

  const isButtonDisabled = () => {
    if (loading && onCancel) {
      // When loading and cancel is available, button should be enabled
      return false;
    }
    if (loading && !onCancel) {
      // When loading but no cancel function, button should be disabled
      return true;
    }
    // When not loading, button is disabled if disabled prop is true or no input
    return disabled || !value.trim();
  };

  return (
    <Grid container alignItems="flex-end" spacing={1.5}>
      <Grid item xs>
        <TextField
          inputRef={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={t('agent-page.message-placeholder')}
          multiline
          minRows={1}
          maxRows={4}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            background: '#fff',
            borderRadius: 2,
          }}
          disabled={loading || disabled}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={getButtonColor()}
          onClick={handleButtonClick}
          disabled={isButtonDisabled()}
          sx={{
            minWidth: 80,
            height: 40,
            borderRadius: 2,
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          {getButtonText()}
        </Button>
      </Grid>
    </Grid>
  );
};

export default MessageInput; 