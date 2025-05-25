import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

const Dialogx: React.FC<{
  open: boolean;
  onClose: () => void;
  onAction: () => void;
  title: string;
  content: string;
  closeBtnText: string;
  actionBtnText: string;
}> = ({ open, title, content, onClose, onAction, closeBtnText, actionBtnText }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => { e.stopPropagation(); onClose(); }}>{closeBtnText}</Button>
        <Button
          color="error"
          onClick={(e) => { e.stopPropagation(); onAction(); }}
        >
          {actionBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dialogx;
