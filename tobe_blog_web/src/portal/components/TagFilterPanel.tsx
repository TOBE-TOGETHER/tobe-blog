import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCommonUtils } from '../../commons';
import { SidePanel } from '../../components';
import { EContentType } from '../../global/enums';
import { ITagStatisticDTO, TopicPropsType } from '../../global/types';
import * as PublicDataService from '../../services/PublicDataService';
import NoContentNewsItem from './NoContentNewsItem';

export default function TagFilterPanel(
  props: Readonly<{ contentType: EContentType[]; ownerId: string; checked: number[]; setChecked: (newValue: number[]) => void; topic: TopicPropsType; keyword: string }>
) {
  const { t } = useCommonUtils();
  const [tagStatistics, setTagStatistics] = useState<ITagStatisticDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      PublicDataService.getTagStatistics(props.contentType, props.ownerId, props.topic, props.keyword)
        .then(response => {
          setTagStatistics(response.data);
        })
        .catch(error => {
          console.error(`Failed to fetch tags info: ${error}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    loadData();
  }, [props.contentType, props.ownerId, props.topic, props.keyword]);

  return (
    <SidePanel title={t('home-page.tag-statistics')}>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="40px"
        />
      ) : (
        <TagList
          tagStatistics={tagStatistics}
          handleToggle={handleToggle}
          checked={props.checked}
        />
      )}
    </SidePanel>
  );
}

const TagList = (props: { tagStatistics: ITagStatisticDTO[]; handleToggle: (value: number) => () => void; checked: number[] }) => {
  const { tagStatistics, handleToggle, checked } = props;
  return tagStatistics.length > 0 ? (
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
                  checked={checked.indexOf(Number.parseInt(n.value)) !== -1}
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
  ) : (
    <NoContentNewsItem />
  );
};
