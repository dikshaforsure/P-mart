import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import PawTrail from './PawTrail';
import ScrollToTop from './ScrollToTop';
import PageTransition from './PageTransition';

export default function AppLayout() {
  return <><ScrollToTop /><PageTransition /><PawTrail /><SiteHeader /><main id="main-content"><Outlet /></main><SiteFooter /></>;
}
