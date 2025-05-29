import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useCommonUtils } from '../../commons';
import { SidePanel } from '../../components';
import { EContentType } from '../../global/enums';

interface ContentTypeOption {
  value: EContentType;
  label: string;
  count?: number;
}

export default function ContentTypeFilterPanel(
  props: Readonly<{
    availableContentTypes: EContentType[];
    selectedContentTypes: EContentType[];
    onContentTypesChange: (newValue: EContentType[]) => void;
  }>
) {
  const { t } = useCommonUtils();

  const handleToggle = (value: EContentType) => () => {
    const currentIndex = props.selectedContentTypes.indexOf(value);
    let newSelected = [...props.selectedContentTypes];
    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected = newSelected.filter(i => i !== value);
    }
    props.onContentTypesChange(newSelected);
  };

  const getContentTypeLabel = (type: EContentType): string => {
    switch (type) {
      case EContentType.Article:
        return t('home-page.articles');
      case EContentType.Plan:
        return t('home-page.plans');
      case EContentType.Vocabulary:
        return t('home-page.vocabularies');
      case EContentType.Collection:
        return t('home-page.collections');
      default:
        return type;
    }
  };

  const contentTypeOptions: ContentTypeOption[] = props.availableContentTypes.map(type => ({
    value: type,
    label: getContentTypeLabel(type),
  }));

  return (
    <SidePanel title={t('home-page.content-type-filter.title')}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {contentTypeOptions.map((option: ContentTypeOption) => {
          const labelId = `checkbox-list-label-${option.value}`;
          return (
            <ListItem
              key={option.value}
              sx={{ py: 0 }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(option.value)}
                dense
                color="text.secondary"
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={props.selectedContentTypes.indexOf(option.value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={option.label}
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
  );
} 