import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import project from "../../../package.json";

/**
 * Copyright component
 *
 * 著作权组件
 */
function Copyright(props: any) {
  const license = process.env.REACT_APP_WEB_REGISTER_LICENSE;
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        <strong>{project.name.toUpperCase()}</strong>
      </Link>{" "}
      {new Date().getFullYear()}
      {license && (
        <>
          {" · "}
          <Link color="inherit" href="https://beian.miit.gov.cn">
            {license}
          </Link>
        </>
      )}
    </Typography>
  );
}

export default Copyright;
