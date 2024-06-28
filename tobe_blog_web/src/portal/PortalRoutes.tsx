import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { URL } from './URL';

const ArticleReadingPage = React.lazy(() => import('../portal/containers/content/article/ArticleReadingPage'));

export function getPortalRoutes(): ReactNode {
  return (
    <Route
      key={URL.NEWS_ARTICLE_DETAIL}
      path={URL.NEWS_ARTICLE_DETAIL}
      element={<ArticleReadingPage />}
    ></Route>
  );
}
