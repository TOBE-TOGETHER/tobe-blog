import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { useCommonUtils } from '../../../../commons';
import { IBaseUserContentDTO } from '../../../../global/types';
import ContentDateItem from './ContentDateItem';

interface IContentDatesSectionProps {
  readonly content: IBaseUserContentDTO;
  readonly cardStyle?: object;
  readonly isLastCard?: boolean;
}

export default function ContentDatesSection({ content, cardStyle, isLastCard = false }: IContentDatesSectionProps) {
  const { t } = useCommonUtils();
  const theme = useTheme();

  const defaultCardStyle = { elevation: 0, border: `1px solid ${theme.palette.divider}`, mb: isLastCard ? 0 : 3 };
  const finalCardStyle = cardStyle || defaultCardStyle;

  return (
    <Card sx={finalCardStyle}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          {t('content-stats.dates')}
        </Typography>
        
        <ContentDateItem 
          label={t('content-stats.created-date')} 
          date={content.createTime} 
        />
        
        {content.publicToAll && (
          <ContentDateItem 
            label={t('content-stats.published-date')} 
            date={content.publishTime} 
          />
        )}
        
        <ContentDateItem 
          label={t('content-stats.last-updated')} 
          date={content.updateTime} 
        />
      </CardContent>
    </Card>
  );
} 