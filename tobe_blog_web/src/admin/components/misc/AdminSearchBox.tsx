import { TextField, InputAdornment, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCommonUtils } from '../../../commons';
import theme from '../../../theme';

interface IAdminSearchBoxProps {
  readonly value: string;
  readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly placeholder?: string;
  readonly width?: { xs?: string | number; sm?: string | number; md?: string | number };
  readonly variant?: 'standard' | 'outlined' | 'filled';
  readonly size?: 'small' | 'medium';
}

export default function AdminSearchBox({
  value,
  onChange,
  placeholder,
  width = { xs: '100%', sm: '100%', md: 285 },
  variant = 'outlined',
  size = 'small'
}: IAdminSearchBoxProps) {
  const { t } = useCommonUtils();

  const defaultPlaceholder = placeholder || t('content-admin.search-placeholder');

  return (
    <TextField
      placeholder={defaultPlaceholder}
      variant={variant}
      size={size}
      value={value}
      onChange={onChange}
      sx={{ 
        width,
        '& .MuiOutlinedInput-root': {
          height: '42px',
          fontSize: '14px',
          color: 'rgba(0,0,0,0.4)',
          backgroundColor: 'white',
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
            boxShadow: '0 0 0 1px ' + theme.palette.primary.dark,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark,
            boxShadow: '0 0 0 1px ' + theme.palette.primary.dark,
          },
          pr: '10px'
        },
        '& .MuiOutlinedInput-input': {
          fontSize: '14px',
          color: 'rgba(0,0,0,0.87)',
          '&::placeholder': {
            fontSize: '14px',
            color: 'rgba(0,0,0,0.4)',
            opacity: 1,
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ gap: 0 }}>
            <Divider 
              orientation="vertical" 
              sx={{ 
                height: '24px',
                marginRight: '8px',
                borderColor: 'rgba(0,0,0,0.12)'
              }} 
            />
            <SearchIcon sx={{ color: 'rgba(0,0,0,0.4)', fontSize: '20px' }} />
          </InputAdornment>
        ),
      }}
    />
  );
} 