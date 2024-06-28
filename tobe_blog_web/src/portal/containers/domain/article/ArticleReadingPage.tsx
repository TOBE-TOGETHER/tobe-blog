import { Container, Grid, Link, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../../../contexts';
import { ArticleDetailDTO } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PublicDataService } from '../../../../services';
import {
  ContentPageBreadcrumbsBar,
  ContentPageMetaBar,
  FrontendLayout,
  RichContentReader,
  TagDisplayBar
} from '../../../components/index.ts';

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
    <FrontendLayout>
      <Grid
        container
        item
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${article?.coverImgUrl});`,
          position: 'relative',
          width: '100%',
          height: {
            xs: '40vh',
            sm: '40vh',
            md: '50vh',
          },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        <Container>
          <Typography
            color={'white'}
            sx={{ mt: 10, overflow: 'hidden', fontSize: { xs: '1.5rem', sm: '2rem', lineBreak: 'anywhere' } }}
          >
            {article?.title}
          </Typography>
          <Typography
            variant={'h6'}
            color={'white'}
            sx={{ mt: 2, overflow: 'hidden', letterSpacing: { xs: 2, sm: 6 }, textWrap: 'nowrap' }}
          >
            {article?.subTitle}
          </Typography>
        </Container>
      </Grid>
      <Container
        sx={{
          minHeight: '50vh',
          pb: 2,
        }}
      >
        <ContentPageBreadcrumbsBar />
        <Grid container>
          {article && (
            <ContentPageMetaBar
              ownerId={article.ownerId}
              authorName={article.authorName}
              publishTime={article.publishTime}
              viewCount={article.viewCount}
              editLinkUrl={`/my/articles/${article.id}`}
            />
          )}

          {article?.content && (
            <Grid
              item
              container
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
                  <RichContentReader htmlValue={article.content} />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
        {article?.tags && (
          <Grid
            item
            xs={12}
            sx={{ mb: 1 }}
          >
            <TagDisplayBar tags={article?.tags} />
          </Grid>
        )}
      </Container>
    </FrontendLayout>
  );
}
