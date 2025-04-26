import CopyrightIcon from '@mui/icons-material/Copyright';
import PeopleIcon from '@mui/icons-material/People';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Box, Container, styled, Typography } from '@mui/material';
import { useCommonUtils } from '../../../commons';

const AdvantagesSectionWrapper = styled('section')`
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(240, 255, 240, 0.8));
  position: relative;
  padding: 5rem 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.3), rgba(76, 175, 80, 0.3), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.3), rgba(33, 150, 243, 0.3), transparent);
  }
`;

const BlobShape = styled('div')`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 43% 57% 70% 30% / 45% 55% 45% 55%;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%);
  animation: transform 20s ease-in-out infinite both alternate;
  z-index: -1;
  opacity: 1;

  @keyframes transform {
    0% {
      border-radius: 43% 57% 70% 30% / 45% 55% 45% 55%;
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      border-radius: 55% 45% 30% 70% / 55% 45% 55% 45%;
      transform: translate(50px, 50px) rotate(180deg);
    }
  }

  &:nth-of-type(1) {
    top: -200px;
    left: -100px;
  }

  &:nth-of-type(2) {
    bottom: -200px;
    right: -100px;
    width: 400px;
    height: 400px;
    animation-delay: -5s;
  }
`;

const AdvantageItem = styled(Box)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

const AdvantageIconWrapper = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  background: linear-gradient(135deg, #2196f3, #4caf50);
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  & svg {
    font-size: 24px;
  }
`;

const AdvantageContent = styled(Box)`
  text-align: left;
`;

export default function AdvantagesSection() {
  const { t } = useCommonUtils();

  const advantages = [
    {
      icon: <SmartToyIcon />,
      title: t('home-page.advantages.items.ai.title'),
      description: t('home-page.advantages.items.ai.description'),
    },
    {
      icon: <PeopleIcon />,
      title: t('home-page.advantages.items.community.title'),
      description: t('home-page.advantages.items.community.description'),
    },
    {
      icon: <CopyrightIcon />,
      title: t('home-page.advantages.items.copyright.title'),
      description: t('home-page.advantages.items.copyright.description'),
    },
  ];

  return (
    <AdvantagesSectionWrapper>
      <BlobShape />
      <BlobShape />
      <Container
        maxWidth="lg"
        sx={{ px: { xs: 3, md: 8 } }}
      >
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 8,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #2196f3, #4caf50)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 2px 10px rgba(0,0,0,0.05)',
            lineBreak: 'words',
          }}
        >
          {t('home-page.advantages.title')}
        </Typography>

        {advantages.map((advantage, index) => (
          <AdvantageItem key={index}>
            <AdvantageIconWrapper>{advantage.icon}</AdvantageIconWrapper>
            <AdvantageContent>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {advantage.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {advantage.description}
              </Typography>
            </AdvantageContent>
          </AdvantageItem>
        ))}
      </Container>
    </AdvantagesSectionWrapper>
  );
}
