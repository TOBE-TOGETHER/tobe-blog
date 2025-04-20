import { TextField } from '@mui/material';
import { useCommonUtils } from '../../../../../commons';
import { FormPanel, HalfRow, OneRow } from '../../../../../components';
import { MultipleTagSelecter } from '../../../../components';
import { IContentMainSectionProps } from '../../commons';
import TopicSelector from '../../components/TopicSelector';

export default function ContentEditMainSection(props: Readonly<IContentMainSectionProps>) {
  const { t } = useCommonUtils();
  return (
    <FormPanel sx={{ mt: 1, ...props.sx }}>
      <OneRow>
        <TextField
          label={t('collection-creation-page.fields.name')}
          fullWidth
          disabled={!props.editable}
          value={props.title}
          onChange={e => props.setTitle(e.target.value)}
        />
      </OneRow>
      <OneRow>
        <TextField
          label={t('collection-creation-page.fields.description')}
          fullWidth
          disabled={!props.editable}
          value={props.description}
          onChange={event => props.setDescription(event.target.value)}
        />
      </OneRow>
      <HalfRow>
        <TextField
          label={t('collection-creation-page.fields.cover-img-url')}
          fullWidth
          disabled={!props.editable}
          autoComplete="coverImgUrl"
          value={props.coverImgUrl}
          onChange={event => props.setCoverImgUrl(event.target.value)}
        />
      </HalfRow>
      <HalfRow>
        <TopicSelector
          editable={props.editable}
          topic={props.topic}
          setTopic={props.setTopic}
        />
      </HalfRow>
      <OneRow>
        <MultipleTagSelecter
          value={props.tagValues}
          setValue={props.setTagValues}
          disabled={!props.editable}
        />
      </OneRow>
    </FormPanel>
  );
}
