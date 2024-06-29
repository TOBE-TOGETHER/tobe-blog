import AbcIcon from '@mui/icons-material/Abc';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Grid, Link, SxProps, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ICollectionDTO, ITagRelationshipDTO } from '../../../../global/types';
import { URL } from '../../../../routes';
import { PublicDataService } from '../../../../services';
import { ContentReadingPage } from '../ContentReadingPage';

export default function CollectionReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [collection, setCollection] = useState<ICollectionDTO | null>(null);
  const { id } = useParams();

  const Section = (props: { text: string; variant: SectionVariant }) => {
    return (
      <Grid
        item
        xs={12}
      >
        <Typography
          color={'textSecondary'}
          sx={props.variant.sx}
        >
          {props.text}
        </Typography>
      </Grid>
    );
  };

  const ArticleLink = (props: { text: string; href: string }) => {
    return (
      <Grid
        item
        xs={12}
        sx={{ mt: 1 }}
      >
        <Link
          href={props.href}
          underline="hover"
          color={'info.main'}
        >
          <ArticleOutlinedIcon sx={{ width: '1rem', height: '1rem' }} /> {props.text}
        </Link>
      </Grid>
    );
  };

  const VocabularyLink = (props: { text: string; href: string }) => {
    return (
      <Grid
        item
        xs={12}
        sx={{ mt: 1 }}
      >
        <Link
          href={props.href}
          underline="hover"
          color={'info.main'}
        >
          <AbcIcon sx={{ width: '1rem', height: '1rem' }} /> {props.text}
        </Link>
      </Grid>
    );
  };

  const ToBeContinuedTip = () => {
    return (
      <Grid
        item
        xs={12}
      >
        <Typography color={'textSecondary'}>{t('subject-reading-page.tip.tba')}</Typography>
      </Grid>
    );
  };

  function printCollectionTree(collection: ICollectionDTO | null) {
    if (!collection) {
      return <Typography color="textSecondary">{t('subject-reading-page.tip.tba')}</Typography>;
    }
    const result: JSX.Element[] = [];
    const deepth: number = getDepthOfTree(collection.tagTree);
    convertTreeToList(collection.tagTree, 0, result, sectionVariants.slice(0, deepth).reverse(), collection.id, collection.title);
    return (
      <Grid
        container
        flexDirection="row"
      >
        {result}
      </Grid>
    );
  }

  function convertTreeToList(
    treeNodes: ITagRelationshipDTO[],
    depth: number,
    elements: JSX.Element[],
    sectionVariants: SectionVariant[],
    collectionId: string,
    collectionName: string
  ): void {
    if (!treeNodes || treeNodes.length === 0) {
      return;
    } else {
      treeNodes?.forEach((n: ITagRelationshipDTO) => {
        elements.push(
          <Section
            text={n.label}
            variant={sectionVariants[depth]}
            key={n.id}
          />
        );
        let eles: JSX.Element[] = [];
        n.relatedContents?.forEach((a: IBaseUserContentDTO) => {
          eles.push(
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
            >
              <ArticleLink
                key={a.id}
                text={a.title}
                href={URL.NEWS_ARTICLE_DETAIL.replace(':id', a.id) + `?si=${collectionId}&sn=${collectionName}`}
              />
            </Grid>
          );
        });
        if (eles && eles.length > 0) {
          elements.push(
            <Grid
              container
              flexDirection="row"
            >
              {eles}
            </Grid>
          );
        }

        if (n.children.length === 0 && n.relatedContents?.length === 0) {
          elements.push(<ToBeContinuedTip />);
        }
        convertTreeToList(n.children, depth + 1, elements, sectionVariants, collectionId, collectionName);
      });
    }
  }

  function getDepthOfTree(treeNodes: ITagRelationshipDTO[]): number {
    if (!treeNodes || treeNodes.length === 0) {
      return 0;
    } else {
      let result = 1;
      treeNodes?.forEach((n: ITagRelationshipDTO) => {
        let temp = 1 + getDepthOfTree(n.children);
        if (temp >= result) {
          result = temp;
        }
      });
      return result;
    }
  }

  useEffect(() => {
    function load(): void {
      PublicDataService.getSubjectById(id || '')
        .then(response => {
          setCollection(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t('subjects-reading-page.msg.error'), {
            variant: 'error',
          });
        });
    }
    load();
  }, [t, enqueueSnackbar, id]);

  return (
    <ContentReadingPage
      content={collection}
      editLinkUrlPrefix={URL.COLLECTION_DETAIL}
    >
      {printCollectionTree(collection)}
    </ContentReadingPage>
  );
}
interface SectionVariant {
  sx: SxProps;
}
const sectionVariants: SectionVariant[] = [
  {
    sx: {
      mt: 1,
      mb: 1,
      color: 'textSecondary',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  {
    sx: {
      mt: 2,
      mb: 2,
      color: 'primary',
      fontWeight: 600,
      fontSize: '1.25rem',
      borderBottom: '1px solid #e7e7e7',
    },
  },
  {
    sx: {
      mt: 2,
      mb: 3,
      color: 'primary',
      fontWeight: 500,
      fontSize: '1.25rem',
      borderBottom: '1px solid #e7e7e7',
    },
  },
  {
    sx: {
      mt: 6,
      mb: 3,
      color: 'primary',
      fontWeight: 600,
      fontSize: '1.25rem',
      borderBottom: '1px solid #e7e7e7',
    },
  },
];
