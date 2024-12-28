import { Container, Grid } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import config from '../../../../customization.json';
import { Loading } from '../../../components';
import { IBaseUserContentDTO } from '../../../global/types';
import { ContentBanner, ContentPageMetaBar, PortalLayout, RelevantContentsPanel } from '../../components';

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
    const titleMeta: Element | null = document.querySelector('META[name="og:title"]');
    const originTitleValue: string | undefined | null = titleMeta?.getAttribute('content');
    const descMeta: Element | null = document.querySelector('META[name="og:description"]');
    const originDescValue: string | undefined | null = descMeta?.getAttribute('content');
    const imageMeta: Element | null = document.querySelector('META[name="og:image"]');
    const originImageValue: string | undefined | null = imageMeta?.getAttribute('content');
    const urlMeta: Element | null = document.querySelector('META[name="og:url"]');
    const originUrlValue: string | undefined | null = urlMeta?.getAttribute('content');
    
    window.document.title = props.content?.title ? props.content?.title : originTitle;
    titleMeta?.setAttribute('content', `${props.content?.title}`);
    descMeta?.setAttribute('content', `${props.content?.description}`)
    imageMeta?.setAttribute('content', `${props.content?.coverImgUrl}`)
    urlMeta?.setAttribute('content', window.location.href);

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    return function restoreTitleAndMeta() {
      window.document.title = `${originTitle}`;
      titleMeta?.setAttribute('content', `${originTitleValue}`);
      descMeta?.setAttribute('content', `${originDescValue}`);
      imageMeta?.setAttribute('content', `${originImageValue}`);
      urlMeta?.setAttribute('content', `${originUrlValue}`);
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

        {props.content && <RelevantContentsPanel content={props.content} />}
      </Container>
    </PortalLayout>
  );
}
