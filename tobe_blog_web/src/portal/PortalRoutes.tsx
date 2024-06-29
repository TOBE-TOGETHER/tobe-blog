import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { URL } from './URL';

const ArticleReadingPage = React.lazy(() => import('./containers/content/article/ArticleReadingPage'));
const PlanReadingPage = React.lazy(() => import('./containers/content/plan/PlanReadingPage'));
const VocabularyReadingPage = React.lazy(() => import('./containers/content/vocabulary/VocabularyReadingPage'));
const CollectionReadingPage = React.lazy(() => import('./containers/content/collection/CollectionReadingPage'));

export function getPortalRoutes(): ReactNode[] {
  return [
    <Route
      key={URL.NEWS_ARTICLE_DETAIL}
      path={URL.NEWS_ARTICLE_DETAIL}
      element={<ArticleReadingPage />}
    />,
    <Route
      key={URL.NEWS_PLAN_DETAIL}
      path={URL.NEWS_PLAN_DETAIL}
      element={<PlanReadingPage />}
    />,
    <Route
      key={URL.NEWS_VOCABULARY_DETAIL}
      path={URL.NEWS_VOCABULARY_DETAIL}
      element={<VocabularyReadingPage />}
    />,
    <Route
      key={URL.NEWS_COLLECTION_DETAIL}
      path={URL.NEWS_COLLECTION_DETAIL}
      element={<CollectionReadingPage />}
    />,
  ];
}
