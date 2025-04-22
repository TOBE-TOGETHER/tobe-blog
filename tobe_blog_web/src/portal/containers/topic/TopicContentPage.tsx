import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EContentType } from '../../../global/enums';
import { PortalLayout } from '../../components';
import FunctionSection from '../../components/FunctionSection';

export default function TopicContentPage() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const handleClear = () => {
    setSearchValue('');
    setKeyword('');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
    setKeyword(searchValue);
  };

  return (
    <PortalLayout
      headerStyles={{ backgroundColor: 'transparent' }}
      bodyStyles={{ background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)' }}
    >
      <Container sx={{ mt: 1 }}>
        <Box sx={{ width: '100%', marginTop: '120px', borderRadius: 4 }}>
          <TextField
            fullWidth
            value={searchValue}
            variant="outlined"
            placeholder="Search..."
            onChange={e => setSearchValue(e.target.value)}
            InputProps={{
              sx: {
                pl: 3,
              },
              startAdornment: <InputAdornment position="start"></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  {searchValue && (
                    <IconButton
                      aria-label="clear search"
                      onClick={handleClear}
                      edge="end"
                      size="large"
                      sx={{
                        mr: 1,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="search"
                    onClick={handleSearch}
                    edge="end"
                    sx={{
                      'bgcolor': 'primary.main',
                      'color': 'white',
                      'borderRadius': '0 16px 16px 0',
                      'border': '1px 0px 1px 0px solid rgba(0, 0, 0, 0.12)',
                      '&:hover': {
                        bgcolor: 'primary.light',
                      },
                      'height': '56px',
                      'width': '100px',
                      'marginRight': '-16px',
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              'backgroundColor': 'white',
              'borderRadius': 4,
              'overflow': 'hidden',
              '& .MuiOutlinedInput-root': {
                'borderRadius': 4,
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.12)',
                  borderRadius: 4,
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.24)',
                },
                '& .MuiInputAdornment-root': {
                  marginRight: 0,
                },
              },
            }}
          />
        </Box>
      </Container>

      <FunctionSection
        sx={{ mt: 2 }}
        extraPanels={[]}
        ownerId={''}
        topic={id}
        keyword={keyword}
        availableContentTypes={[EContentType.Article, EContentType.Plan, EContentType.Vocabulary, EContentType.Collection]}
      />
    </PortalLayout>
  );
}
