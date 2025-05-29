import { ReactNode } from 'react';
import { Page } from '../../../../components/layout';
import { IBaseUserContentDTO } from '../../../../global/types';
import BaseContentService from '../BaseContentService';
import ContentEditBar from './ContentEditBar';

export default function BaseContentPage(
  props: Readonly<{
    children?: ReactNode[] | ReactNode;
    id: string | undefined;
    title: string;
    loading: boolean;
    editable: boolean;
    handleEditableChange: () => void;
    service: BaseContentService;
    contentData?: IBaseUserContentDTO | null;
    onVisibilityChange?: () => void;
  }>
) {
  return (
    <Page
      openLoading={props.loading}
      pageTitle={props.title}
    >
      <ContentEditBar
        id={props.id}
        editable={props.editable}
        handleEditableChange={props.handleEditableChange}
        service={props.service}
        onVisibilityChange={props.onVisibilityChange}
        contentData={props.contentData}
      />
      {props.children}
    </Page>
  );
}
