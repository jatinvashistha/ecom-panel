import { IconAperture, IconLayoutDashboard, IconLogin } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  
  
  
  {
    id: uniqueId(),
    navlabel: true,
    icon: IconAperture,
    subheader: 'Manage Products',
    subMenu1: ' All Products',
    subMenu2: ' Add Product',
    link1: '/allProducts',
    link2: '/addProducts',
  },
  {
    id: uniqueId(),
    navlabel: true,
    icon: IconAperture,
    subheader: 'Manage Users',
    subMenu1: 'Users',
    link1: '/getAllUsers',
  },
  {
    id: uniqueId(),
    navlabel: true,
    icon: IconAperture,
    subheader: 'Manage Orders',
    subMenu1: 'All Orders',
    link1: '/getOrders', 
  },
  {
    id: uniqueId(), 
    title: 'Logout', 
    icon: IconLogin,
    href: '/logout',
  },
];

export default Menuitems;
