import React from 'react';
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts';
import { ELocalStorageKeys } from '../global/enums.ts';
import { BackendLayout } from './components';

import { URL } from '../routes';

const SignInPage = React.lazy(() => import('../portal/containers/signIn/SignIn'));
const ProfileSettingPage = React.lazy(() => import('./containers/profileSettingPage/ProfileSettingPage'));
const UsersPage = React.lazy(() => import('./containers/user/UsersPage'));
const AnalyticsPage = React.lazy(() => import('./containers/analytics/AnalyticsPage'));

const ArticlesPage = React.lazy(() => import('./containers/content/article/ArticlesPage'));
const ArticleCreationPage = React.lazy(() => import('./containers/content/article/ArticleCreationPage'));
const ArticleDetailPage = React.lazy(() => import('./containers/content/article/ArticleDetailPage'));

const PlanCreationPage = React.lazy(() => import('./containers/content/plan/PlanCreationPage.tsx'));
const PlanDetailPage = React.lazy(() => import('./containers/content/plan/PlanDetailPage.tsx'));
const PlansPage = React.lazy(() => import('./containers/content/plan/PlansPage.tsx'));

const VOCsPage = React.lazy(() => import('./containers/content/vocabulary/VOCsPage'));
const VOCDetailPage = React.lazy(() => import('./containers/content/vocabulary/VOCDetailPage'));
const VOCCreationPage = React.lazy(() => import('./containers/content/vocabulary/VOCCreationPage'));

const CollectionsPage = React.lazy(() => import('./containers/content/collection/CollectionsPage'));
const CollectionCreationPage = React.lazy(() => import('./containers/content/collection/CollectionCreationPage'));
const CollectionDetailPage = React.lazy(() => import('./containers/content/collection/CollectionDetailPage'));

export function getAdminRoutes(): React.ReactNode[] {
  return [
    <Route
      element={<ProtectedRoutes />}
      key="protected-routes"
    >
      <Route
        path={URL.SIGN_OUT}
        element={<SignOutRoute />}
      />
      <Route
        path={URL.PROFILE}
        element={<ProfileSettingPage />}
      />
      <Route
        path={URL.USERS}
        element={<UsersPage />}
      />
      <Route
        path={URL.ANALYTICS}
        element={<AnalyticsPage />}
      />
      <Route
        path={URL.PLANS}
        element={<PlansPage />}
      />
      <Route
        path={URL.CREATE_PLAN}
        element={<PlanCreationPage />}
      />
      <Route
        path={URL.PLAN_DETAIL}
        element={<PlanDetailPage />}
      />
      <Route
        path={URL.ARTICLES}
        element={<ArticlesPage />}
      />
      <Route
        path={URL.CREATE_ARTICLE}
        element={<ArticleCreationPage />}
      />
      <Route
        path={URL.ARTICLE_DETAIL}
        element={<ArticleDetailPage />}
      />
      <Route
        path={URL.VOCABULARIES}
        element={<VOCsPage />}
      />
      <Route
        path={URL.VOCABULARY_DETAIL}
        element={<VOCDetailPage />}
      />
      <Route
        path={URL.CREATE_VOCABULARY}
        element={<VOCCreationPage />}
      />
      <Route
        path={URL.COLLECTIONS}
        element={<CollectionsPage />}
      />
      <Route
        path={URL.COLLECTION_DETAIL}
        element={<CollectionDetailPage />}
      />
      <Route
        path={URL.CREATE_COLLECTION}
        element={<CollectionCreationPage />}
      />
    </Route>,
  ];
}

const useAuth = (): boolean => {
  const context = useAuthState();

  return !!context?.user;
};

function ProtectedRoutes(): React.ReactElement | null {
  const location = useLocation();
  return useAuth() ? (
    <BackendLayout>
      <Outlet />
    </BackendLayout>
  ) : (
    <Navigate
      replace={true}
      to={URL.SIGN_IN}
      state={{ from: location }}
    />
  );
}

function SignOutRoute() {
  localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
  localStorage.removeItem(ELocalStorageKeys.AUTHORITIES);
  localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
  localStorage.removeItem(ELocalStorageKeys.CURRENT_USER);

  const dispatch = useAuthDispatch();
  dispatch({ type: 'LOGOUT', payload: null });
  return <SignInPage />;
}
