import { Container, Grid } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { IMeta, switchMetas } from '../../../commons';
import { Loading } from '../../../components';
import { IBaseUserContentDTO } from '../../../global/types';
import { ContentBanner, ContentPageMetaBar, PortalLayout, RelevantContentsPanel } from '../../components';
import { CommentSection } from '../../components/comment';
import config from '../../../../customization.json';

export default function ContentReadingPage(
  props: Readonly<{
    content: IBaseUserContentDTO | null;
    subTitle?: string;
    editLinkUrlPrefix: string;
    children: ReactNode;
  }>
) {
  useEffect(() => {
    const originTitle = window.document.title;
    const metas: IMeta[] = [
      { name: 'og:title', content: props.content?.title },
      { name: 'og:description', content: props.content?.description },
      { name: 'description', content: props.content?.description },
      { name: 'og:image', content: props.content?.coverImgUrl },
      { name: 'og:url', content: window.location.href + 'v?=' + new Date().getTime() },
    ];
    switchMetas(metas);
    window.document.title = props.content?.title ?? originTitle;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return function restoreTitleAndMeta() {
      window.document.title = `${originTitle}`;
      switchMetas(metas);
    };
  });
  return (
    <PortalLayout>
      {props.content && (
        <ContentBanner
          contentId={props.content.id}
          title={props.content.title}
          subTitle={props.subTitle}
          coverImgUrl={props.content.coverImgUrl || config.defaultContentCoverImgUrl}
          topic={props.content.topic}
          tags={props.content.tags}
        />
      )}
      <Container
        sx={{
          minHeight: '50vh',
          pb: 2,
          backgroundColor: 'white',
        }}
      >
        <Loading open={!props.content} />
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

        {/* Comment Section */}
        {props.content && <CommentSection content={props.content} />}

        {props.content && <RelevantContentsPanel content={props.content} />}
      </Container>
    </PortalLayout>
  );
}
