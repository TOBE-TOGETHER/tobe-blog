import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SidePanel } from '../../../components/index.ts';
import { EContentType } from '../../../global/enums.ts';
import { ITagStatisticDTO } from '../../../global/types.ts';
import * as PublicDataService from '../../../services/PublicDataService.ts';

export default function TagFilterPanel(props: { contentType: EContentType; ownerId: string; checked: number[]; setChecked: (newValue: number[]) => void }) {
  const { t } = useTranslation();
  const [tagStatistics, setTagStatistics] = useState<ITagStatisticDTO[]>([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = props.checked.indexOf(value);
    let newChecked = [...props.checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked = newChecked.filter(i => i !== value);
    }
    props.setChecked(newChecked);
  };

  useEffect(() => {
    function loadData(): void {
      PublicDataService.getTagStatistics(props.contentType, props.ownerId)
        .then(response => {
          setTagStatistics(response.data);
        })
        .catch(error => {
          console.error(`Failed to fetch tags info: ${error}`);
        });
    }
    loadData();
  }, [props.contentType, props.ownerId]);

  return tagStatistics.length > 0 ? (
    <SidePanel title={t('home-page.tag-statistics')}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {tagStatistics.map((n: ITagStatisticDTO) => {
          const labelId = `checkbox-list-label-${n.value}`;
          return (
            <ListItem
              key={n.value}
              sx={{ py: 0 }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(Number.parseInt(n.value))}
                dense
                color="text.secondary"
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={props.checked.indexOf(Number.parseInt(n.value)) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${n.label}(${n.count})`}
                  sx={{
                    color: 'text.secondary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </SidePanel>
  ) : (
    <></>
  );
}
