import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormPanel, OneRow } from '../../../../../components';
import { MultipleTagSelecter } from '../../../../components';
import { IContentMainSectionProps } from '../../commons';

export default function ContentEditMainSection(props: Readonly<IContentMainSectionProps>) {
  const { t } = useTranslation();
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
      <OneRow>
        <TextField
          label={t('collection-creation-page.fields.cover-img-url')}
          fullWidth
          disabled={!props.editable}
          autoComplete="coverImgUrl"
          value={props.coverImgUrl}
          onChange={event => props.setCoverImgUrl(event.target.value)}
        />
      </OneRow>
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
