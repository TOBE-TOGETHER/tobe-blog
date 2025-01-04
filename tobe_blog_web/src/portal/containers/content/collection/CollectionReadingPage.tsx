import AbcIcon from '@mui/icons-material/Abc';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { Grid, Link, SxProps, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPathFromContentType, useCommonUtils } from '../../../../commons';
import { EContentType } from '../../../../global/enums';
import { IBaseUserContentDTO, ICollectionDTO, ITagRelationshipDTO } from '../../../../global/types';
import { URL } from '../../../../routes';
import * as PublicDataService from '../../../../services/PublicDataService.ts';
import ContentReadingPage from '../ContentReadingPage';

export default function CollectionReadingPage() {
  const { t, enqueueSnackbar } = useCommonUtils();
  const [collection, setCollection] = useState<ICollectionDTO | null>(null);
  const { id } = useParams();

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
              <ContentLink
                key={a.id}
                id={a.id}
                text={a.title}
                contentType={a.contentType}
              />
            </Grid>
          );
        });
        if (eles && eles.length > 0) {
          elements.push(
            <Grid
              container
              flexDirection="row"
              key={`row-${n.label}`}
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
  }, [enqueueSnackbar, id]);

  return (
    <ContentReadingPage
      content={collection}
      subTitle={collection?.description}
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

const ContentLink = (props: { id: string; text: string; contentType: string }) => {
  function getIconByContentType(_contentType: string): ReactNode {
    switch (_contentType) {
      case EContentType.Article:
        return <ArticleOutlinedIcon sx={{ width: '1rem', height: '1rem' }} />;
      case EContentType.Vocabulary:
        return <AbcIcon sx={{ width: '1rem', height: '1rem' }} />;
      case EContentType.Plan:
        return <FlagIcon sx={{ width: '1rem', height: '1rem' }} />;
      case EContentType.Collection:
        return <FolderSpecialIcon sx={{ width: '1rem', height: '1rem' }} />;
    }
  }

  return (
    <Grid
      item
      xs={12}
      sx={{ mt: 1 }}
    >
      <Link
        href={`/news/${getPathFromContentType(props.contentType)}/${props.id}`}
        underline="hover"
        color={'text.secondary'}
      >
        {getIconByContentType(props.contentType)} {props.text}
      </Link>
    </Grid>
  );
};

const ToBeContinuedTip = () => {
  const { t } = useCommonUtils();
  return (
    <Grid
      item
      xs={12}
    >
      <Typography color={'textSecondary'}>{t('collection-reading-page.tip.tba')}</Typography>
    </Grid>
  );
};
