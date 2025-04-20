import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCommonUtils } from '../../../../commons';
import { ETopic } from '../../../../global/types';

export default function TopicSelector(props: { editable: boolean; topic: ETopic | string | null; setTopic: (value: ETopic | string | null) => void }) {
  const { t } = useCommonUtils();
  return (
    <FormControl fullWidth>
      <InputLabel>{t('topic.label')}</InputLabel>
      <Select
        label={t('topic.label')}
        fullWidth
        autoComplete="topic"
        disabled={!props.editable}
        value={props.topic}
        onChange={event => {
          props.setTopic(event.target.value as ETopic);
        }}
      >
        {Object.keys(ETopic)
          .filter(key => isNaN(Number(key)))
          .map(key => (
            <MenuItem
              key={key}
              value={key}
            >
              {t(`topic.${key}`)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
