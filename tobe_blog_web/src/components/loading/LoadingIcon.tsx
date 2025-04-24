import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

// Define animations
const pulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
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

const FloatingElement = styled.div<{ delay: string; duration: string; isReverse?: boolean; top: string; left?: string; right?: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  animation: ${props => (props.isReverse ? floatReverse : float)} ${props => props.duration} ease-in-out infinite;
  animation-delay: ${props => props.delay};
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

const TextContainer = styled.div`
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-size: 42px;
  color: #64b5f6;
  z-index: 2;
`;

const Cursor = styled.div`
  width: 20px;
  height: 3px;
  background-color: #64b5f6;
  position: absolute;
  bottom: 5px;
  left: 0;
  animation: blink 1.5s infinite;

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

export default function LoadingIcon() {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const positions = [5, 35, 63, 93, 120];
    const texts = ['', 'T', 'TO', 'TOB', 'TOBE'];
    let index = 0;

    const interval = setInterval(() => {
      setText(texts[index]);
      setCursorPosition(positions[index]);
      index = (index + 1) % positions.length;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContainer>
      <GradientBackground />

      {/* Floating elements around the text */}
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
        top="120px"
        left="30px"
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

      {/* Text with cursor */}
      <TextContainer>
        {text}
        <Cursor style={{ left: `${cursorPosition}px` }} />
      </TextContainer>
    </LoadingContainer>
  );
}
