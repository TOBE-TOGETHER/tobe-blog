import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import config from '../../../customization.json';

function Copyright() {
  const { cnWebRegisterLicense, projectName } = config;
  return (
    <Grid>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {'Copyright © '}
        {new Date().getFullYear()}{' '}
        <Link
          color="inherit"
          href="/"
        >
          <strong>{projectName.toUpperCase()}</strong>
        </Link>
      </Typography>
      {cnWebRegisterLicense && (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          <Link
            color="inherit"
            href="https://beian.miit.gov.cn"
          >
            {cnWebRegisterLicense}
          </Link>
        </Typography>
      )}
    </Grid>
  );
}

export default Copyright;
