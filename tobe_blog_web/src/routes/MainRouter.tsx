import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from '../components/loading/Loading';
import { URL } from './URL';

const HomePage = React.lazy(() => import('../portal/containers/home/Home'));

const SignUp = React.lazy(() => import('../portal/containers/signUp/SignUp'));

const SignIn = React.lazy(() => import('../portal/containers/signIn/SignIn'));

export function MainRouter() {
  return (
    <Suspense fallback={<Loading open={true} />}>
      <BrowserRouter>
        <Routes>
          <Route
            path={URL.HOME}
            element={<HomePage />}
          />
          <Route
            path={URL.SIGN_IN}
            element={<SignIn />}
          ></Route>
          <Route
            path={URL.SIGN_UP}
            element={<SignUp />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
