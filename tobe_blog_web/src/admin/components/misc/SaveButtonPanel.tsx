import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SaveButtonPanel(props: Readonly<{
  primaryEvent: (event: React.MouseEvent<HTMLElement>) => void, 
  secondaryEvent?: (event: React.MouseEvent<HTMLElement>) => void}>) {  
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', my: 2, justifyContent: 'flex-end', width: "100%" }}>
      <Button onClick={props.secondaryEvent ? props.secondaryEvent : () => window.history.back()}>
        {t('components.save-btn-panel.back')}
      </Button>
      <Button variant="contained" onClick={props.primaryEvent}>
        {t('components.save-btn-panel.save')}
      </Button>
    </Box>);
}