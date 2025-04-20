import { TextField } from '@mui/material';
import { useCommonUtils } from '../../../../../commons';
import { FormPanel, HalfRow, OneRow } from '../../../../../components';
import { MultipleTagSelecter } from '../../../../components';
import { IContentMainSectionProps } from '../../commons';
import TopicSelector from '../../components/TopicSelector';

interface IVOCEditMainSectionProps extends IContentMainSectionProps {
  language: string | null;
  setLanguage: (value: string) => void;
}

export default function VOCEditMainSection(props: Readonly<IVOCEditMainSectionProps>) {
  const { t } = useCommonUtils();
  return (
    <FormPanel sx={{ mt: 1, ...props.sx }}>
      <OneRow>
        <TextField
          label={t('vocabulary-creation-page.fields.title')}
          fullWidth
          disabled={!props.editable}
          value={props.title}
          onChange={e => props.setTitle(e.target.value)}
        />
      </OneRow>
      <OneRow>
        <TextField
          label={t('vocabulary-creation-page.fields.language')}
          fullWidth
          autoComplete="language"
          disabled={!props.editable}
          value={props.language}
          onChange={event => props.setLanguage(event.target.value)}
        />
      </OneRow>
      <OneRow>
        <TextField
          label={t('vocabulary-creation-page.fields.description')}
          fullWidth
          autoComplete="description"
          disabled={!props.editable}
          value={props.description}
          onChange={event => props.setDescription(event.target.value)}
        />
      </OneRow>
      <HalfRow>
        <TextField
          label={t('vocabulary-creation-page.fields.cover-img-url')}
          fullWidth
          value={props.coverImgUrl}
          onChange={e => props.setCoverImgUrl(e.target.value)}
          disabled={!props.editable}
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
