import Home from '../pages/Home';
import About from '../pages/About'
const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/user/:id',
    component: About,
  }
];
 
export default Routes;
