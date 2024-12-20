import React from 'react';
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts';
import { ELocalStorageKeys } from '../global/enums.ts';
import { URL } from '../routes';
import { AdminLayout } from './components/index.ts';

// preloading following pages for smoother experience
import AnalyticsPage from './containers/analytics/AnalyticsPage';
import ArticlesPage from './containers/content/article/ArticlesPage';
import CollectionsPage from './containers/content/collection/CollectionsPage';
import PlansPage from './containers/content/plan/PlansPage.tsx';
import VOCsPage from './containers/content/vocabulary/VOCsPage';

// lazy loading following secondary pages
const SignInPage = React.lazy(() => import('../portal/containers/signIn/SignIn'));
const ProfileSettingPage = React.lazy(() => import('./containers/profileSettingPage/ProfileSettingPage'));
const UsersPage = React.lazy(() => import('./containers/user/UsersPage'));
const ContentAdminPage = React.lazy(() => import('./containers/contentAdmin/ContentAdminPage'));

const ArticleCreationPage = React.lazy(() => import('./containers/content/article/ArticleCreationPage'));
const ArticleDetailPage = React.lazy(() => import('./containers/content/article/ArticleDetailPage'));

const PlanCreationPage = React.lazy(() => import('./containers/content/plan/PlanCreationPage.tsx'));
const PlanDetailPage = React.lazy(() => import('./containers/content/plan/PlanDetailPage.tsx'));

const VOCDetailPage = React.lazy(() => import('./containers/content/vocabulary/VOCDetailPage'));
const VOCCreationPage = React.lazy(() => import('./containers/content/vocabulary/VOCCreationPage'));

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
        path={URL.ADMIN}
        element={<ContentAdminPage />}
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
    <AdminLayout>
      <Outlet />
    </AdminLayout>
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
