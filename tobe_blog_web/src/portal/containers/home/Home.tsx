import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import BookIcon from '@mui/icons-material/Book';
import LivelyIcon from '@mui/icons-material/EmojiObjects';
import LanguageIcon from '@mui/icons-material/Language';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useCommonUtils } from '../../../commons';
import { PortalLayout } from '../../components';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const floatReverse = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(20px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeroSection = styled('div')`
  text-align: center;
  padding: ${(props: { theme?: Theme }) => props.theme?.spacing?.(12, 2) ?? '96px 16px'};
  margin-bottom: ${(props: { theme?: Theme }) => props.theme?.spacing?.(8) ?? '64px'};
  position: relative;
  overflow: visible;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(76, 175, 80, 0.05) 50%, rgba(255, 255, 255, 0) 70%);
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

const LogoContainer = styled('div')`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
`;

const LogoText = styled.h1`
  font-size: ${(props: { theme?: Theme }) => (props.theme?.breakpoints?.up('md') ? '8rem' : '5.5rem')};
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #2196f3, #4caf50, #2196f3);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${shine} 3s linear infinite;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 2;
  transform: scale(1.1);
  @media (max-width: 600px) {
    transform: scale(0.9);
  }
`;

interface FloatingElementProps {
  delay?: string;
  duration?: string;
  reverse?: boolean;
}

const FloatingElement = styled('div', {
  shouldForwardProp: (prop: string) => !['delay', 'duration', 'reverse'].includes(prop),
})<FloatingElementProps>(({ delay = '0s', duration = '3s', reverse = false }) => ({
  position: 'absolute',
  animation: `${reverse ? floatReverse : float} ${duration} ease-in-out infinite`,
  animationDelay: delay,
}));

interface IconContainerProps {
  color: string;
}

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
  'opacity': 0.8,
  '& svg': {
    fontSize: 40,
    color: '#fff',
  },
}));

export default function Home() {
  const { t, navigate } = useCommonUtils();

  const categories = [
    {
      icon: <TrendingUpIcon />,
      title: t('home-page.categories.tech-news.title'),
      description: t('home-page.categories.tech-news.description'),
      color: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
      url: '/topic/TECHNICAL',
    },
    {
      icon: <BookIcon />,
      title: t('home-page.categories.book-notes.title'),
      description: t('home-page.categories.book-notes.description'),
      color: 'linear-gradient(135deg, #11998e, #38ef7d)',
      url: '/topic/READING',
    },
    {
      icon: <LivelyIcon />,
      title: t('home-page.categories.life-tips.title'),
      description: t('home-page.categories.life-tips.description'),
      color: 'linear-gradient(135deg, #f2994a, #f2c94c)',
      url: '/topic/LIFE',
    },
    {
      icon: <LanguageIcon />,
      title: t('home-page.categories.language-learning.title'),
      description: t('home-page.categories.language-learning.description'),
      color: 'linear-gradient(135deg, #834d9b, #d04ed6)',
      url: '/topic/LANGUAGE',
    },
  ];

  return (
    <PortalLayout
      headerStyles={{ backgroundColor: 'transparent' }}
      bodyStyles={{
        background: 'linear-gradient(135deg, #E6F0FA, #F0FFF0)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      {/* Floating elements container */}
      <Box
        sx={{
          'position': 'fixed',
          'inset': 0,
          'overflow': 'hidden',
          'pointerEvents': 'none',
          'zIndex': 0,
          '@media (max-width: 600px)': {
            '& > div': {
              'transform': 'scale(0.6)',
              '& > div': {
                opacity: '0.5 !important',
              },
            },
          },
        }}
      >
        {/* Center left area */}
        <FloatingElement style={{ top: '30%', left: '20%' }}>
          <Box
            sx={{
              width: '140px',
              height: '140px',
              background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
              borderRadius: '50%',
              opacity: 0.08,
            }}
          />
        </FloatingElement>
        <FloatingElement
          style={{ top: '45%', left: '15%' }}
          delay="-2s"
          reverse
        >
          <Box
            sx={{
              width: '90px',
              height: '90px',
              background: 'linear-gradient(45deg, #FF9800, #FFB74D)',
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              opacity: 0.06,
            }}
          />
        </FloatingElement>

        {/* Center right area */}
        <FloatingElement
          style={{ top: '35%', right: '18%' }}
          delay="-1.5s"
          duration="4s"
        >
          <Box
            sx={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(45deg, #9C27B0, #BA68C8)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              opacity: 0.07,
            }}
          />
        </FloatingElement>
        <FloatingElement
          style={{ top: '55%', right: '22%' }}
          delay="-3s"
          reverse
        >
          <Box
            sx={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(45deg, #4CAF50, #81C784)',
              borderRadius: '12px',
              transform: 'rotate(15deg)',
              opacity: 0.06,
            }}
          />
        </FloatingElement>

        {/* Upper center area */}
        <FloatingElement
          style={{ top: '15%', left: '35%' }}
          delay="-1s"
          duration="5s"
        >
          <Box
            sx={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(45deg, #00BCD4, #4DD0E1)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              opacity: 0.08,
            }}
          />
        </FloatingElement>
        <FloatingElement
          style={{ top: '20%', right: '40%' }}
          delay="-2.5s"
          reverse
        >
          <Box
            sx={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #FFC107, #FFD54F)',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              opacity: 0.05,
            }}
          />
        </FloatingElement>

        {/* Lower center area */}
        <FloatingElement
          style={{ top: '65%', left: '40%' }}
          delay="-1.8s"
        >
          <Box
            sx={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, #F44336, #EF5350)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              opacity: 0.07,
            }}
          />
        </FloatingElement>
        <FloatingElement
          style={{ top: '70%', right: '35%' }}
          delay="-3.5s"
          duration="6s"
        >
          <Box
            sx={{
              width: '85px',
              height: '85px',
              background: 'linear-gradient(45deg, #673AB7, #9575CD)',
              clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              opacity: 0.06,
            }}
          />
        </FloatingElement>

        {/* Additional center elements */}
        <FloatingElement
          style={{ top: '40%', left: '45%' }}
          delay="-2.2s"
          duration="4.5s"
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(45deg, #E91E63, #F48FB1)',
              borderRadius: '10px',
              transform: 'rotate(-15deg)',
              opacity: 0.08,
            }}
          />
        </FloatingElement>
        <FloatingElement
          style={{ top: '50%', right: '48%' }}
          delay="-1.2s"
          reverse
        >
          <Box
            sx={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(45deg, #009688, #4DB6AC)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              opacity: 0.07,
            }}
          />
        </FloatingElement>
        <FloatingElement
          style={{ top: '25%', left: '50%' }}
          delay="-3.8s"
          duration="5.5s"
        >
          <Box
            sx={{
              width: '65px',
              height: '65px',
              background: 'linear-gradient(45deg, #795548, #A1887F)',
              clipPath: 'circle(50% at 50% 50%)',
              opacity: 0.05,
            }}
          />
        </FloatingElement>
        <FloatingElement
          style={{ top: '60%', right: '45%' }}
          delay="-2.8s"
          reverse
        >
          <Box
            sx={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(45deg, #607D8B, #90A4AE)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              opacity: 0.06,
            }}
          />
        </FloatingElement>
      </Box>

      <HeroSection>
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            px: { xs: 2, sm: 3 },
          }}
        >
          <LogoContainer>
            <LogoText>Tobe Blog</LogoText>
          </LogoContainer>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              color: 'text.secondary',
              fontWeight: 500,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {t('home-page.slogan')}
          </Typography>
        </Container>
      </HeroSection>

      <Container
        maxWidth="lg"
        sx={{
          mb: 12,
          mt: 4,
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid
          container
          spacing={6}
        >
          {categories.map((category, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{ cursor: 'pointer' }}
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
                  {category.description}
                </Typography>
              </GlowingCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PortalLayout>
  );
}
