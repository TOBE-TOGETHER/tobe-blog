import BookIcon from '@mui/icons-material/Book';
import LivelyIcon from '@mui/icons-material/EmojiObjects';
import LanguageIcon from '@mui/icons-material/Language';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Card, Container, Grid, styled, Theme, Typography } from '@mui/material';
import { useCommonUtils } from '../../../commons';

const GlowingCard = styled(Card)`
  height: 100%;
  padding: ${(props: { theme?: Theme }) => props.theme?.spacing?.(4) ?? '32px'};
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease-in-out;
  overflow: visible;
  position: relative;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    & .icon-container {
      transform: scale(1.1) translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }
`;

const IconContainer = styled('div')<IconContainerProps>(({ color }) => ({
  'width': '80px',
  'height': '80px',
  'borderRadius': '20px',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'margin': '-60px auto 20px',
  'background': color,
  'transition': 'all 0.3s ease-in-out',
  'boxShadow': '0 10px 20px rgba(0,0,0,0.1)',
  '& svg': {
    fontSize: 40,
    color: '#fff',
  },
}));
interface IconContainerProps {
  color: string;
}

export default function TopicSection() {
  const { t, navigate } = useCommonUtils();
  const categories = [
    {
      icon: <TrendingUpIcon />,
      title: t('home-page.categories.TECHNICAL.title'),
      description: t('home-page.categories.TECHNICAL.description'),
      color: 'linear-gradient(135deg,rgb(22, 135, 233),rgb(173, 183, 213))',
      url: '/topic/TECHNICAL',
    },
    {
      icon: <BookIcon />,
      title: t('home-page.categories.READING.title'),
      description: t('home-page.categories.READING.description'),
      color: 'linear-gradient(135deg, #11998e, #38ef7d)',
      url: '/topic/READING',
    },
    {
      icon: <LivelyIcon />,
      title: t('home-page.categories.LIFE.title'),
      description: t('home-page.categories.LIFE.description'),
      color: 'linear-gradient(135deg, #f2994a, #f2c94c)',
      url: '/topic/LIFE',
    },
    {
      icon: <LanguageIcon />,
      title: t('home-page.categories.LANGUAGE.title'),
      description: t('home-page.categories.LANGUAGE.description'),
      color: 'linear-gradient(135deg,rgb(177, 66, 170),rgb(218, 63, 122))',
      url: '/topic/LANGUAGE',
    },
  ];
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 8, sm: 0 },
        mb: 6,
        position: 'relative',
        zIndex: 1,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Grid
        container
        spacing={6}
        justifyContent="center"
      >
        {categories.map((category, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ cursor: 'pointer', maxWidth: '350px' }}
            onClick={() => {
              navigate(category.url);
            }}
          >
            <GlowingCard>
              <IconContainer
                className="icon-container"
                color={category.color}
              >
                {category.icon}
              </IconContainer>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {category.title}
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                {category.description.split('，').map((line, index) => (
                  <span key={index}>
                    {line.trim()}
                    <br />
                  </span>
                ))}
              </Typography>
            </GlowingCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
