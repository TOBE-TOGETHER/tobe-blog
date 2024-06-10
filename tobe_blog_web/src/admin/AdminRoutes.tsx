import React from 'react';
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom';
import { URL } from './URL';
import { LOCAL_STORAGE_KEYS } from '../commons';
import { useAuthDispatch, useAuthState } from '../contexts';
import { BackendLayout } from './components';

const SignInPage = React.lazy(
    () => import("../portal/containers/signIn/SignIn")
);
const ProfileSettingPage = React.lazy(() => import('./containers/profileSettingPage/ProfileSettingPage'));
const UsersPage = React.lazy(() => import('./containers/user/UsersPage'));

export function getAdminRoutes(): React.ReactNode[] {
    return [(
        <Route element={<ProtectedRoutes />}>
            <Route path={URL.SIGN_OUT} element={<SignOutRoute />} />
            < Route
                path={URL.PROFILE}
                element={< ProfileSettingPage />}
            />
            < Route
                path={URL.USERS}
                element={< UsersPage />}
            />
        </Route >
    )];
}

const useAuth = (): boolean => {
    const context = useAuthState();
    if (context?.user) {
        return true;
    }
    return false;
};

function ProtectedRoutes(): React.ReactElement | null {
    const location = useLocation();
    return useAuth() ? (
        <BackendLayout>
            <Outlet />
        </BackendLayout>
    ) : (
        <Navigate replace={true} to={URL.SIGN_IN} state={{ from: location }} />
    );
}

function SignOutRoute() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTHORITIES);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);

    const dispatch = useAuthDispatch();
    dispatch({ type: "LOGOUT", payload: null });
    return <SignInPage />;
}