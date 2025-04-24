import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useCommonUtils } from '../../../commons';
import { PortalLayout } from '../../components';
import FloatingElementContainer from '../../components/FloatingElementContainer';
import { shine } from '../../components/StyledComponents';
import TopicSection from './TopicSection';

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

export default function Home() {
  const { t } = useCommonUtils();

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
      <FloatingElementContainer />
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
      <TopicSection />
    </PortalLayout>
  );
}
