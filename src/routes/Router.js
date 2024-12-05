import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
 

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
 


const AddProduct = Loadable(
  lazy(() => import('../layouts/full/sidebar/views/sample-page/AddProduct')),
);

const AllProduct = Loadable(
  lazy(() => import('../layouts/full/sidebar/views/sample-page/AllProduct')),
);
   
const AllUsers = Loadable(
  lazy(() => import('../layouts/full/sidebar/views/sample-page/AllUsers')),
);

const AllOrders = Loadable(
  lazy(() => import('../layouts/full/sidebar/views/sample-page/AllOrders')),
);


const Error = Loadable(lazy(() => import('../layouts/full/sidebar/views/authentication/Error')));
const Register = Loadable(
  lazy(() => import('../layouts/full/sidebar/views/authentication/Register')),
);
const Login = Loadable(lazy(() => import('../layouts/full/sidebar/views/authentication/Login')));
const Logout = Loadable(lazy(() => import('../layouts/full/sidebar/views/sample-page/Logout')));
 
 
 

 

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/getOrders" /> },
 
      { path: '/addProducts', exact: true, element: <AddProduct /> },
      { path: '/allProducts', exact: true, element: <AllProduct /> },

      { path: '/getAllUsers', exact: true, element: <AllUsers /> },

      { path: '/getOrders', exact: true, element: <AllOrders /> },

      { path: '/logout', exact: true, element: <Logout /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;

const AdminToken = localStorage.getItem('AdminToken');

if (AdminToken) {
  Router[0].children = Router[0].children.map((route) => {
    if (route.path === '/auth/login' || route.path === '/auth/register') {
      return route;
    }
    return {
      ...route,
      element: AdminToken ? route.element : <Navigate to="/getOrders" />,
    };
  });
} else {
  Router[0].children = Router[0].children.map((route) => ({
    ...route,
    element:
      route.path === '/auth/login' || route.path === '/auth/register' ? (
        route.element
      ) : (
        <Navigate to="/auth/login" />
      ),
  }));
}
