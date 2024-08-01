import { SxProps, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormPanel, OneRow } from '../../../../../components';
import { ITagOption } from '../../../../../global/types';
import { MultipleTagSelecter } from '../../../../components';

interface IVOCEditMainSectionProps {
  title: string | null;
  setTitle: (value: string) => void;
  description: string | null;
  setDescription: (value: string) => void;
  language: string | null;
  setLanguage: (value: string) => void;
  coverImgUrl: string | null;
  setCoverImgUrl: (value: string) => void;
  tagValues: ITagOption[];
  setTagValues: (value: ITagOption[]) => void;
  editable: boolean;
  sx?: SxProps;
}

export default function VOCEditMainSection(props: Readonly<IVOCEditMainSectionProps>) {
  const { t } = useTranslation();
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
      <OneRow>
        <TextField
          label={t('vocabulary-creation-page.fields.cover-img-url')}
          fullWidth
          value={props.coverImgUrl}
          onChange={e => props.setCoverImgUrl(e.target.value)}
          disabled={!props.editable}
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
