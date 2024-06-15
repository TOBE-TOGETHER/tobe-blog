import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  useLocation,
} from 'react-router-dom';
import {
  useAuthDispatch,
  useAuthState,
} from '../contexts';
import { ELocalStorageKeys } from '../global/enums.ts';
import { URL } from './URL';
import { BackendLayout } from './components';
import PlanCreationPage from './containers/content/plan/PlanCreationPage.tsx';
import PlansPage from './containers/content/plan/PlansPage.tsx';

const SignInPage = React.lazy(
  () => import('../portal/containers/signIn/SignIn'),
);
const ProfileSettingPage = React.lazy(() => import('./containers/profileSettingPage/ProfileSettingPage'));
const UsersPage = React.lazy(() => import('./containers/user/UsersPage'));
const ArticlesPage = React.lazy(() => import('./containers/content/article/ArticlesPage'));
const ArticleCreationPage = React.lazy(() => import('./containers/content/article/ArticleCreationPage'));
const ArticleDetailPage = React.lazy(() => import('./containers/content/article/ArticleDetailPage'));
const VOCsPage = React.lazy(() => import('./containers/content/vocabulary/VOCsPage'));
const VOCDetailPage = React.lazy(() => import('./containers/content/vocabulary/VOCDetailPage'));
const VOCCreationPage = React.lazy(() => import('./containers/content/vocabulary/VOCCreationPage'));

export function getAdminRoutes(): React.ReactNode[] {
  return [
    (
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
          path={URL.PLANS}
          element={<PlansPage />}
        ></Route>
        <Route
          path={URL.CREATE_PLAN}
          element={<PlanCreationPage />}
        ></Route>
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
      </Route>
    ),
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
