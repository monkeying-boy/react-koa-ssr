import Home from '../pages/Home';
import About from '../pages/About'
import PageMiddle from '../components/PageMiddle'

const Routes = [
  {
    path: '/',
    exact: true,
    component: PageMiddle(Home)
  },
  {
    path: '/about',
    component: PageMiddle(About),
  },
  {
    path: '/user/:id',
    component:PageMiddle(About),
  }
];
 
export default Routes;
