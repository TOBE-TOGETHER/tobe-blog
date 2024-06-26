import {
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { useAuthState } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { TimeFormat } from '../../commons';
import { URL } from '../../routes';

export default function ContentPageMetaBar(props: {
  authorName: string;
  ownerId: number | string;
  publishTime: string;
  viewCount: number;
  editLinkUrl: string;
}) {
  const { t } = useTranslation();
  const authState = useAuthState();
  return (
    <Grid
      item
      container
      xs={12}
      sx={{ my: 1 }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ flexGrow: 1 }}
      >
        <Link
          href={URL.PERSONAL_PORTAL.replace(':id', props.ownerId.toString())}
          underline="none"
          target="blank"
          color="text.secondary"
        >
          {props.authorName}
        </Link>{' '}
        · {TimeFormat.dateAndTimeFormat(props.publishTime)} ·{' '}
        {t('components.meta-bar.view')} {props.viewCount}
      </Typography>
      {authState?.user?.id ===
        (typeof props.ownerId === 'string'
          ? Number.parseInt(props.ownerId)
          : props.ownerId) && (
          <Link
            href={props.editLinkUrl}
            sx={{ flexGrow: 0 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flexGrow: 1 }}
            >
              {t('components.meta-bar.edit-btn')}
            </Typography>
          </Link>
        )}
    </Grid>
  );
}
