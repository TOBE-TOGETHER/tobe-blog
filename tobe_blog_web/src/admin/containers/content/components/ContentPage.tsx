import { ReactNode } from 'react';
import { Page } from '../../../components';
import ContentEditBar from './ContentEditBar';

export default function BaseContentPage(
  props: Readonly<{ children?: ReactNode[] | ReactNode; title: string; loading: boolean; editable: boolean; handleEditableChange: () => void }>
) {
  return (
    <Page
      openLoading={props.loading}
      pageTitle={props.title}
    >
      <ContentEditBar
        editable={props.editable}
        handleEditableChange={props.handleEditableChange}
      />
      {props.children}
    </Page>
  );
}
