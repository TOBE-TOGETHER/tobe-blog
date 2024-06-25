import { Checkbox, Grid, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TagOption } from '../../../../../global/types';
import theme from '../../../../../theme';
import { MultipleTagSelecter, OneRow, RichContentEditor, SaveButtonPanel } from '../../../../components';

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
      <Paper sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 4 }}>
        <Grid
          container
          spacing={3}
        >
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
        </Grid>

        <Grid
          container
          sx={{ mt: 2, border: '0.5px, solid ' + theme.palette.grey[300], borderRadius: '8px' }}
        >
          <RichContentEditor
            htmlValue={props.htmlValue}
            textValue={props.textValue}
            setHtmlValue={props.setHtmlValue}
            setTextValue={props.setTextValue}
          />
        </Grid>
        <Grid container>
          <OneRow>
            <Checkbox
              size="small"
              aria-label={t('article-creation-page.fields.content-protected')}
              checked={props.contentProtected}
              onChange={e => props.setContentProtected(e.target.checked)}
            />
          </OneRow>
        </Grid>
      </Paper>
      <SaveButtonPanel primaryEvent={props.onClickPrimaryBtn} />
    </>
  );
}
