import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

// Define animations
const pulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

const enlarge = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
`;

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

// Styled components for the loading animation
const LoadingContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GradientBackground = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.15) 0%, rgba(76, 175, 80, 0.1) 50%, rgba(255, 255, 255, 0) 70%);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LetterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

interface LetterProps {
  active: boolean;
}

const Letter = styled.div<LetterProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 42px;
  color: #64b5f6;
  animation: ${props => (props.active ? enlarge : 'none')} 0.6s ease-in-out;
  margin: 0 2px;
`;

const FloatingElement = styled.div<{ delay: string; duration: string; isReverse?: boolean; top: string; left?: string; right?: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  animation: ${props => (props.isReverse ? floatReverse : float)} ${props => props.duration} ease-in-out infinite;
  animation-delay: ${props => props.delay};
  z-index: 1;
`;

const CircleElement = styled.div<{ size: string; color: string; opacity: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background: ${props => props.color};
  opacity: ${props => props.opacity};
`;

const SquareElement = styled.div<{ size: string; color: string; opacity: string; rotation?: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 12px;
  background: ${props => props.color};
  opacity: ${props => props.opacity};
  transform: ${props => (props.rotation ? `rotate(${props.rotation})` : 'none')};
`;

const DiamondElement = styled.div<{ size: string; color: string; opacity: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.color};
  opacity: ${props => props.opacity};
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`;

export default function LoadingIcon() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 4);
    }, 500); // Faster animation (from 1000ms to 500ms)

    return () => clearInterval(interval);
  }, []);

  // Letters in order: T, O, B, E
  const letters = ['T', 'O', 'B', 'E'];

  return (
    <LoadingContainer>
      <GradientBackground />

      {/* Floating background elements */}
      <FloatingElement
        delay="0.5s"
        duration="4s"
        isReverse={false}
        top="10px"
        left="10px"
      >
        <CircleElement
          size="32px"
          color="linear-gradient(45deg, #2196F3, #64B5F6)"
          opacity="0.2"
        />
      </FloatingElement>

      <FloatingElement
        delay="1.2s"
        duration="5s"
        isReverse={true}
        top="60px"
        right="15px"
      >
        <SquareElement
          size="24px"
          color="linear-gradient(45deg, #4CAF50, #81C784)"
          opacity="0.2"
          rotation="15deg"
        />
      </FloatingElement>

      <FloatingElement
        delay="0.8s"
        duration="4.5s"
        isReverse={false}
        top="140px"
        left="20px"
      >
        <DiamondElement
          size="28px"
          color="linear-gradient(45deg, #9C27B0, #BA68C8)"
          opacity="0.2"
        />
      </FloatingElement>

      <FloatingElement
        delay="1.5s"
        duration="4.2s"
        isReverse={true}
        top="140px"
        right="30px"
      >
        <CircleElement
          size="22px"
          color="linear-gradient(45deg, #FF9800, #FFB74D)"
          opacity="0.2"
        />
      </FloatingElement>

      <LetterContainer>
        {letters.map((letter, index) => (
          <Letter
            key={index}
            active={activeIndex === index}
          >
            {letter}
          </Letter>
        ))}
      </LetterContainer>
    </LoadingContainer>
  );
}
