import { Grid, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define animations
export const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Styled components
export const PageContainer = styled(Grid)`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #e6f0fa, #f0fff0);
  overflow: hidden;
`;

export const LogoText = styled(Typography)`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(90deg, #2196f3, #4caf50, #2196f3);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${shine} 3s linear infinite;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
  text-align: center;
`;

export const HeroSection = styled('div')(() => ({
  'position': 'relative',
  'overflow': 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(76, 175, 80, 0.05) 50%, rgba(255, 255, 255, 0) 70%)',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
  },
}));
