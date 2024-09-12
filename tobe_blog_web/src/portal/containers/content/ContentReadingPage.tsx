import { Container, Grid } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import config from '../../../../customization.json';
import { Loading } from '../../../components';
import { IBaseUserContentDTO } from '../../../global/types';
import { ContentBanner, ContentPageMetaBar, PortalLayout } from '../../components';

export default function ContentReadingPage(
  props: Readonly<{
    content: IBaseUserContentDTO | null;
    subTitle?: string;
    editLinkUrlPrefix: string;
    children: ReactNode;
  }>
) {
  useEffect(() => {
    window.document.title = `${props.content?.title ? props.content?.title + ' | ' : ''}${config.projectName.toUpperCase()}`;
    return function restoreTitle() {
      window.document.title = `${config.projectName.toUpperCase()}`;
    };
  });
  return (
    <PortalLayout>
      {props.content && (
        <ContentBanner
          contentId={props.content.id}
          title={props.content.title}
          subTitle={props.subTitle}
          coverImgUrl={props.content.coverImgUrl}
          tags={props.content.tags}
        />
      )}
      <Container
        sx={{
          minHeight: '50vh',
          pb: 2,
        }}
      >
        <Loading open={props.content ? false : true} />
        <Grid container>
          {props.content && (
            <ContentPageMetaBar
              ownerId={props.content.ownerId}
              ownerName={props.content.ownerName}
              publishTime={props.content.publishTime}
              viewCount={props.content.viewCount}
              likeCount={props.content.likeCount}
              editLinkUrl={props.editLinkUrlPrefix.replace(':id', props.content.id)}
            />
          )}

          {props.content && (
            <Grid
              item
              container
            >
              {props.children}
            </Grid>
          )}
        </Grid>
      </Container>
    </PortalLayout>
  );
}
