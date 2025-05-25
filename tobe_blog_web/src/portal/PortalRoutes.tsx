import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { URL } from '../routes';
const HomePage = React.lazy(() => import('./containers/home/Home'));
const TopicPage = React.lazy(() => import('./containers/topic/TopicContentPage'));
const SignUp = React.lazy(() => import('./containers/signUp/SignUp'));
const SignIn = React.lazy(() => import('./containers/signIn/SignIn'));
const EmailVerification = React.lazy(() => import('./containers/emailVerification/EmailVerification'));
const ResetPasswordPage = React.lazy(() => import('./containers/resetPassword/ResetPasswordPage'));
const PersonalPortalPage = React.lazy(() => import('./containers/personalPortal/PersonalPortalPage'));
const ArticleReadingPage = React.lazy(() => import('./containers/content/article/ArticleReadingPage'));
const PlanReadingPage = React.lazy(() => import('./containers/content/plan/PlanReadingPage'));
const VocabularyReadingPage = React.lazy(() => import('./containers/content/vocabulary/VocabularyReadingPage'));
const CollectionReadingPage = React.lazy(() => import('./containers/content/collection/CollectionReadingPage'));
const ContentRedirector = React.lazy(() => import('./containers/content/ContentRedirector'));

export default function getPortalRoutes(): ReactNode[] {
  return [
    <Route
      key={URL.HOME}
      path={URL.HOME}
      element={<HomePage />}
    />,
    <Route
      key={URL.TOPIC}
      path={URL.TOPIC}
      element={<TopicPage />}
    />,
    <Route
      key={URL.SIGN_IN}
      path={URL.SIGN_IN}
      element={<SignIn />}
    />,
    <Route
      key={URL.SIGN_UP}
      path={URL.SIGN_UP}
      element={<SignUp />}
    />,
    <Route
      key={URL.VERIFY_EMAIL}
      path={URL.VERIFY_EMAIL}
      element={<EmailVerification />}
    />,
    <Route
      key={URL.RESET_PASSWORD}
      path={URL.RESET_PASSWORD}
      element={<ResetPasswordPage />}
    />,
    <Route
      key={URL.PERSONAL_PORTAL}
      path={URL.PERSONAL_PORTAL}
      element={<PersonalPortalPage />}
    />,
    <Route
      key={URL.CONTENT_REDIRECT}
      path={URL.CONTENT_REDIRECT}
      element={<ContentRedirector />}
    />,
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
