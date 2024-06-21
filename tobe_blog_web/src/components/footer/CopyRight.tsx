import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import plan from '../../../package.json';

/**
 * Copyright component
 *
 * 著作权组件
 */
function Copyright(props: any) {
  const license = import.meta.env.VITE_WEB_REGISTER_LICENSE;
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="/"
      >
        <strong>{plan.name.toUpperCase()}</strong>
      </Link>{' '}
      {new Date().getFullYear()}
      {license && (
        <>
          {' · '}
          <Link
            color="inherit"
            href="https://beian.miit.gov.cn"
          >
            {license}
          </Link>
        </>
      )}
    </Typography>
  );
}

export default Copyright;
