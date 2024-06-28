import { keyframes, styled } from '@mui/material';
import theme from '../../theme.ts';

export default function StrokeText(props: {
  text: string,
  color?: string,
  viewBoxWidth?: number,
  viewBoxHeight?: number
}) {
  const color = props.color || theme.palette.primary.main;
  const width = props.viewBoxWidth ?? 250;
  const height = props.viewBoxHeight ?? 50;
  const viewBox = `0 0 ${width} ${height}`;

  const textAnimation = keyframes`
    0% {
      stroke-dashoffset: 170;
    }

    50% {
      fill: transparent;
    }

    80% {
      stroke-dashoffset: 0;
    }
    100% {
      fill: ${color};
      stroke-dashoffset: 0;
    }
  `;

  const Text = styled('text')(() => ({
    fill: 'transparent',
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: 'inherit',
    fontWeight: 'bold',
    strokeWidth: 2,
    stroke: color,
    strokeLinecap: 'round',
    strokeDashoffset: '170',
    strokeDasharray: '170 170',
    textAnchor: 'start',
    alignmentBaseline: 'text-before-edge',
    animation: `${textAnimation} 3s ease-in forwards`,
  }));

  return (
    <svg viewBox={viewBox}>
      <Text>
        {props.text}
      </Text>
    </svg>
  )
}
