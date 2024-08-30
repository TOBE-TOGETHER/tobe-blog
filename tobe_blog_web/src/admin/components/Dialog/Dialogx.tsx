import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React from "react";
import {useTranslation} from "react-i18next";


const Dialogx: React.FC<{
    open: boolean;
    onClose: () => void;
    onAction: () => void
}> = ({
          open,
          onClose,
          onAction
      }) => {
    const {t} = useTranslation();
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t('dialog.delete.title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('dialog.delete.content')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t('dialog.cancel')}</Button>
                <Button onClick={onAction}>{t('dialog.confirm')}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Dialogx;