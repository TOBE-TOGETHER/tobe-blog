import {
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../../../contexts';
import { EContentType } from '../../../../global/enums';
import { ArticleDetailDTO } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PublicDataService } from '../../../../services';
import {
  AuthorDisplayPanel,
  ContentPageBreadcrumbsBar,
  ContentPageFrame,
  ContentPageMetaBar,
  Page,
  RelevantContentPanel,
  RichContentReader,
  TagDisplayBar,
} from '../../../components/index.ts';

export default function ArticleReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const authState = useAuthState();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleDetailDTO | null>(null);
  
  useEffect(() => {
    function loadArticle(): void {
      setOpenLoading(true);
      PublicDataService.getArticleById(id || '')
        .then((response) => {
          setArticle(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('article-reading-page.msg.error'), {
            variant: 'error',
          });
        })
        .finally(() => setOpenLoading(false));
    }
    
    loadArticle();
  }, [
    t,
    id,
    enqueueSnackbar,
  ]);
  
  return (
    <Page
      openLoading={openLoading}
      pageTitle={article?.title}
    >
      <ContentPageBreadcrumbsBar />
      <ContentPageFrame
        mainContent={
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
            
            {article?.subTitle && (
              <>
                <Grid
                  item
                  xs={12}
                  sx={{ my: 1 }}
                  color="text.secondary"
                >
                  <Paper
                    sx={{ py: 1, px: 1, backgroundColor: '#f3f2ef' }}
                    variant="outlined"
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      {article?.subTitle}
                    </Typography>
                  </Paper>
                </Grid>
                <Divider />
              </>
            )}
            
            {article?.tags && (
              <Grid
                item
                xs={12}
                sx={{ mb: 1 }}
              >
                <TagDisplayBar tags={article?.tags} />
              </Grid>
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
        }
        sideContents={[
          article && (
            <AuthorDisplayPanel
              key="side-1"
              userId={article.ownerId}
            />
          ),
          article && (
            <RelevantContentPanel
              key="side-2"
              id={article.id}
              tages={article.tags.map((i) => i.value)}
              domain={EContentType.Article}
              linkUrl={URL.NEWS_ARTICLE_DETAIL}
            />
          ),
        ]}
      />
    </Page>
  );
}
