import { Grid, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommonUtils } from '../../../../commons/index.ts';
import { SEOHead } from '../../../../components';
import { useAuthState } from '../../../../contexts';
import { IArticleDetailDTO } from '../../../../global/types';
import { useSEO } from '../../../../hooks';
import { URL } from '../../../../routes';
import * as PublicDataService from '../../../../services/PublicDataService.ts';
import ContentReadingPage from '../ContentReadingPage.tsx';
import RichContentReader from './RichContentReader.tsx';
import { parseHeadingsFromHtml, HeadingInfo } from './headingTreeUtils.ts';
import ContentNavFabDrawer from './ContentNavFabDrawer';

export default function ArticleReadingPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const authState = useAuthState();
  const { id } = useParams();
  const [article, setArticle] = useState<IArticleDetailDTO | null>(null);
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [htmlWithIds, setHtmlWithIds] = useState<string>('');

  useEffect(() => {
    function loadArticle(): void {
      PublicDataService.getArticleById(id ?? '')
        .then(response => {
          setArticle(response.data);
          const { headings, htmlWithIds } = parseHeadingsFromHtml(response.data.content);
          setHeadings(headings);
          setHtmlWithIds(htmlWithIds);
        })
        .catch(() => {
          enqueueSnackbar(t('article-reading-page.msg.error'), {
            variant: 'error',
          });
        });
    }

    loadArticle();
  }, [t, id, enqueueSnackbar]);

  // Use SEO Hook
  const seoData = useSEO({
    content: article,
    contentType: 'article',
  });

  return (
    <>
      {seoData && <SEOHead {...seoData} />}
      <ContentReadingPage
        content={article}
        subTitle={article?.subTitle}
        editLinkUrlPrefix={URL.ARTICLE_DETAIL}
      >
        <ContentNavFabDrawer headings={headings} />
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
              container
              item
              xs={12}
              sx={{
                my: '1vh',
                px: 0,
                mx: 0,
                filter: 'blur(3px)',
                userSelect: 'none',
                overflow: 'hidden',
              }}
            >
              <RichContentReader htmlValue={htmlWithIds} />
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
              overflow: 'hidden',
            }}
          >
            {article && <RichContentReader htmlValue={htmlWithIds} />}
          </Grid>
        )}
      </ContentReadingPage>
    </>
  );
}
