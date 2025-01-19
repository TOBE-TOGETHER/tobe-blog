import { ReactNode } from 'react';
import { Page } from '../../../components';
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
      />
      {props.children}
    </Page>
  );
}
