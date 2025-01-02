import { FormControlLabel, Switch, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormPanel, OneRow } from '../../../../../components';
import { MultipleTagSelecter } from '../../../../components';
import { IContentMainSectionProps } from '../../commons';
import RichContentEditor from './RichContentEditor';

export interface IArticleEditMainSectionProps extends IContentMainSectionProps {
  subTitle: string;
  setSubTitle: (value: string) => void;
  contentProtected: boolean;
  setContentProtected: (value: boolean) => void;
  htmlValue: string;
  setHtmlValue: (value: string) => void;
  setTextValue: (value: string) => void;
}

export default function ArticleEditMainSection(props: Readonly<IArticleEditMainSectionProps>) {
  const { t } = useTranslation();
  return (
    <FormPanel sx={{ mt: 1, ...props.sx }}>
      <OneRow>
        <TextField
          fullWidth
          label={t('article-creation-page.fields.title')}
          disabled={!props.editable}
          value={props.title}
          onChange={v => props.setTitle(v.target.value)}
          error={props.title.length >= 128}
        />
      </OneRow>
      <OneRow>
        <TextField
          fullWidth
          label={t('article-creation-page.fields.sub-title')}
          disabled={!props.editable}
          value={props.subTitle}
          onChange={v => props.setSubTitle(v.target.value)}
          error={props.subTitle.length >= 1000}
        />
      </OneRow>
      <OneRow>
        <TextField
          fullWidth
          label={t('article-creation-page.fields.cover-img-url')}
          disabled={!props.editable}
          value={props.coverImgUrl}
          onChange={v => props.setCoverImgUrl(v.target.value)}
          error={props.coverImgUrl?.length >= 2000}
        />
      </OneRow>
      <OneRow>
        <MultipleTagSelecter
          disabled={!props.editable}
          value={props.tagValues}
          setValue={props.setTagValues}
        />
      </OneRow>
      <OneRow>
        <RichContentEditor
          htmlValue={props.htmlValue}
          setHtmlValue={props.setHtmlValue}
          setTextValue={props.setTextValue}
          editable={props.editable}
        />
      </OneRow>
      <OneRow>
        <FormControlLabel
          control={
            <Switch
              disabled={!props.editable}
              checked={props.contentProtected}
              onChange={e => props.setContentProtected(e.target.checked)}
            />
          }
          label={t('article-creation-page.fields.content-protected')}
        />
      </OneRow>
    </FormPanel>
  );
}
