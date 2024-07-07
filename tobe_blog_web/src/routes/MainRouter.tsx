import { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { getAdminRoutes } from '../admin/AdminRoutes';
import { Loading } from '../components';
import getPortalRoutes from '../portal/PortalRoutes';

export function MainRouter() {
  return (
    <Suspense fallback={<Loading open={true} />}>
      <BrowserRouter>
        <Routes>
          {getPortalRoutes()}
          {getAdminRoutes()}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
