export const AdminRoute = {
  path: '',
  redirect: '/admin',
  match: true,
  children: [
    {
      path: 'admin',
    },
  ],
};
