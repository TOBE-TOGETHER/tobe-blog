import { Box, keyframes, styled } from '@mui/material';

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
function FloatingElementContainer() {
  return (
    <Box
      sx={{
        'position': 'fixed',
        'inset': 0,
        'overflow': 'hidden',
        'pointerEvents': 'none',
        'zIndex': 0,
        '@media (min-width: 600px)': {
          '& > div': {
            'transform': 'scale(0.6)',
            '& > div': {
              opacity: '0.3 !important',
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
    </Box>
  );
}
export default FloatingElementContainer;
