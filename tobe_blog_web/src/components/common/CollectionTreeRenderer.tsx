import AbcIcon from '@mui/icons-material/Abc';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { Grid, Link, SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { getPathFromContentType, useCommonUtils } from '../../commons';
import { EContentType } from '../../global/enums';
import { IBaseUserContentDTO, ICollectionDTO, ITagRelationshipDTO } from '../../global/types';
import { URL } from '../../routes';

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

interface CollectionTreeRendererProps {
  collection: ICollectionDTO | null;
  isAdminMode?: boolean; // true for admin preview, false for portal reading
  noDataMessage?: string;
  toBeContinuedMessage?: string;
}

export default function CollectionTreeRenderer({
  collection,
  isAdminMode = false,
  noDataMessage,
  toBeContinuedMessage
}: Readonly<CollectionTreeRendererProps>): ReactNode {
  const { t } = useCommonUtils();

  function printCollectionTree(collection: ICollectionDTO | null): ReactNode {
    if (!collection) {
      return (
        <Typography color="textSecondary">
          {noDataMessage || t('collection-reading-page.tip.tba')}
        </Typography>
      );
    }
    const result: JSX.Element[] = [];
    const depth: number = getDepthOfTree(collection.tagTree);
    convertTreeToList(collection.tagTree, 0, result, sectionVariants.slice(0, depth).reverse(), collection.id, collection.title);
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
    }
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
            key={a.id}
          >
            <ContentLink
              id={a.id}
              text={a.title}
              contentType={a.contentType}
              isAdminMode={isAdminMode}
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
        elements.push(
          <ToBeContinuedTip 
            key={`tbc-${n.id}`} 
            message={toBeContinuedMessage}
          />
        );
      }
      convertTreeToList(n.children, depth + 1, elements, sectionVariants, collectionId, collectionName);
    });
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

  return printCollectionTree(collection);
}

const Section = (props: { text: string; variant: SectionVariant }): JSX.Element => {
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

const ContentLink = (props: { 
  id: string; 
  text: string; 
  contentType: string; 
  isAdminMode: boolean;
}): JSX.Element => {
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

  function getUrl(): string {
    if (props.isAdminMode) {
      // Admin mode: link to edit pages
      switch (props.contentType) {
        case EContentType.Article:
          return URL.ARTICLE_DETAIL.replace(':id', props.id);
        case EContentType.Plan:
          return URL.PLAN_DETAIL.replace(':id', props.id);
        case EContentType.Vocabulary:
          return URL.VOCABULARY_DETAIL.replace(':id', props.id);
        case EContentType.Collection:
          return URL.COLLECTION_DETAIL.replace(':id', props.id);
        default:
          return '#';
      }
    } else {
      // Portal mode: link to reading pages
      return `/news/${getPathFromContentType(props.contentType)}/${props.id}`;
    }
  }

  return (
    <Grid
      item
      xs={12}
      sx={{ mt: 1 }}
    >
      <Link
        href={getUrl()}
        underline="hover"
        color="text.secondary"
      >
        {getIconByContentType(props.contentType)} {props.text}
      </Link>
    </Grid>
  );
};

const ToBeContinuedTip = (props: { message?: string }): JSX.Element => {
  const { t } = useCommonUtils();
  return (
    <Grid
      item
      xs={12}
    >
      <Typography color={'textSecondary'}>
        {props.message || t('collection-reading-page.tip.tba')}
      </Typography>
    </Grid>
  );
}; 