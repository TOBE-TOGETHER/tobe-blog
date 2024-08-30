import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import config from '../../../customization.json';

function Copyright() {
  const { webRegisterLicense, projectName } = config;
  return (
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
      {webRegisterLicense && (
        <>
          {' · '}
          <Link
            color="inherit"
            href="https://beian.miit.gov.cn"
          >
            {webRegisterLicense}
          </Link>
        </>
      )}
    </Typography>
  );
}

export default Copyright;
