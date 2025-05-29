import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface ConfirmDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly title: string;
  readonly content: string;
  readonly cancelText: string;
  readonly confirmText: string;
  readonly confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  cancelText,
  confirmText,
  confirmColor = 'error'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          {cancelText}
        </Button>
        <Button 
          onClick={(e) => { e.stopPropagation(); onConfirm(); }}
          color={confirmColor}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog; 