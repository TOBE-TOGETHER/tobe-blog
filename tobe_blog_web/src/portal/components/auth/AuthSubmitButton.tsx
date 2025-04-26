import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface AuthSubmitButtonProps extends ButtonProps {
  loading?: boolean;
}

export default function AuthSubmitButton({
  children,
  loading = false,
  disabled,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <Button
      fullWidth
      variant="contained"
      disabled={disabled || loading}
      {...props}
      sx={{
        borderRadius: '12px',
        padding: '12px',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        ...props.sx,
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
} 