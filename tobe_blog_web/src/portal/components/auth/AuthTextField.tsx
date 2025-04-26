import { TextField, TextFieldProps } from '@mui/material';

export default function AuthTextField(props: TextFieldProps) {
  return (
    <TextField
      fullWidth
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        },
        '& .MuiInputLabel-root': {
          fontSize: '1rem',
        },
        '& .MuiOutlinedInput-input': {
          padding: '14px 16px',
        },
        ...props.sx,
      }}
    />
  );
} 