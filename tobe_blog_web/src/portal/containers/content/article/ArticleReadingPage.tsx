import { Grid, Link, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../../../contexts';
import { ArticleDetailDTO } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PublicDataService } from '../../../../services';
import { RichContentReader } from '../../../components';
import { ContentReadingPage } from '../ContentReadingPage';

export default function ArticleReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const authState = useAuthState();
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleDetailDTO | null>(null);

  useEffect(() => {
    function loadArticle(): void {
      PublicDataService.getArticleById(id || '')
        .then(response => {
          setArticle(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('article-reading-page.msg.error'), {
            variant: 'error',
          });
        });
    }

    loadArticle();
  }, [t, id, enqueueSnackbar]);

  return (
    <ContentReadingPage
      content={article}
      subTitle={article?.subTitle}
      editLinkUrlPrefix={URL.ARTICLE_DETAIL}
    >
      {article?.contentProtected && !authState?.user?.id ? (
        <Grid container>
          <Grid
            container
            justifyContent="center"
          >
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {article.description}
            </Typography>
            <Link href={URL.SIGN_IN}>
              <Typography
                color="textSecondary"
                variant="h5"
                sx={{ mt: 2 }}
              >
                {t('article-reading-page.content-protected')}
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              my: '1vh',
              px: 0,
              mx: 0,
              filter: 'blur(3px)',
              userSelect: 'none',
            }}
          >
            <RichContentReader htmlValue={article.content} />
          </Grid>
        </Grid>
      ) : (
        <Grid
          item
          container
          xs={12}
          sx={{
            my: 1,
            px: 0,
            mx: 0,
          }}
        >
          {article && <RichContentReader htmlValue={article.content} />}
        </Grid>
      )}
    </ContentReadingPage>
  );
}
