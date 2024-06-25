import { Checkbox, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TagOption } from '../../../../../global/types';
import { FormPanel, MultipleTagSelecter, OneRow, RichContentEditor, SaveButtonPanel } from '../../../../components';

export interface ArticleEditMainSectionProps {
  title: string;
  setTitle: (value: string) => void;
  subTitle: string;
  setSubTitle: (value: string) => void;
  coverImgUrl: string;
  setCoverImgUrl: (value: string) => void;
  contentProtected: boolean;
  setContentProtected: (value: boolean) => void;
  tagValues: TagOption[];
  setTagValues: (value: TagOption[]) => void;
  htmlValue: string;
  setHtmlValue: (value: string) => void;
  textValue: string;
  setTextValue: (value: string) => void;
  onClickPrimaryBtn: () => void;
}

export default function ArticleEditMainSection(props: ArticleEditMainSectionProps) {
  const { t } = useTranslation();
  return (
    <>
      <FormPanel>
        <OneRow>
          <TextField
            fullWidth
            label={t('article-creation-page.fields.title')}
            value={props.title}
            onChange={v => props.setTitle(v.target.value)}
            error={props.title.length >= 128}
          />
        </OneRow>
        <OneRow>
          <TextField
            fullWidth
            label={t('article-creation-page.fields.sub-title')}
            value={props.subTitle}
            onChange={v => props.setSubTitle(v.target.value)}
            error={props.subTitle.length >= 1000}
          />
        </OneRow>
        <OneRow>
          <TextField
            fullWidth
            label={t('article-creation-page.fields.cover-img-url')}
            value={props.coverImgUrl}
            onChange={v => props.setCoverImgUrl(v.target.value)}
            error={props.coverImgUrl?.length >= 2000}
          />
        </OneRow>
        <OneRow>
          <MultipleTagSelecter
            value={props.tagValues}
            setValue={props.setTagValues}
          />
        </OneRow>
        <OneRow>
          <RichContentEditor
            htmlValue={props.htmlValue}
            textValue={props.textValue}
            setHtmlValue={props.setHtmlValue}
            setTextValue={props.setTextValue}
          />
        </OneRow>
        <OneRow>
          <Checkbox
            size="small"
            aria-label={t('article-creation-page.fields.content-protected')}
            checked={props.contentProtected}
            onChange={e => props.setContentProtected(e.target.checked)}
          />
        </OneRow>
      </FormPanel>
      <SaveButtonPanel primaryEvent={props.onClickPrimaryBtn} />
    </>
  );
}
