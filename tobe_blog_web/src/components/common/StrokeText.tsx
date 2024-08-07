import { keyframes, styled } from '@mui/material';
import theme from '../../theme.ts';

export default function StrokeText(props: Readonly<{ text: string, color?: string, viewBoxWidth?: number, viewBoxHeight?: number }>) {
  const color = props.color ?? theme.palette.primary.main;
  const width = props.viewBoxWidth ?? 260;
  const height = props.viewBoxHeight ?? 50;
  const viewBox = `0 0 ${width} ${height}`;
  const isSafari = window.navigator.userAgent.toLowerCase().includes('safari');

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
    fontSize: 'inherit',
    fontWeight: 'bold',
    strokeWidth: 2,
    fontFamily: isSafari ? '"Times New Roman, San Francisco, PingFang SC"' : 'inherit',
    stroke: color,
    strokeLinecap: 'round',
    strokeDashoffset: '170',
    strokeDasharray: '170 170',
    animation: `${textAnimation} .5s ease-in forwards`
  }));

  return (
    <svg width={width} height={height} viewBox={viewBox}>
      <Text y={'75%'}>{props.text}</Text>
    </svg>
  );
}
