import { MenuItem, TextField } from '@mui/material';
import { useCommonUtils } from '../../../../commons';
import { ETopic } from '../../../../global/enums';
import { TopicPropsType } from '../../../../global/types';

export default function TopicSelector(props: Readonly<{ editable: boolean; topic: TopicPropsType; setTopic: (value: TopicPropsType) => void }>) {
  const { t } = useCommonUtils();
  return (
    <TextField
      select
      label={t('topic.label')}
      fullWidth
      autoComplete="topic"
      disabled={!props.editable}
      value={props.topic}
      onChange={event => {
        props.setTopic(event.target.value);
      }}
      InputLabelProps={{ shrink: true }}
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
    </TextField>
  );
}
