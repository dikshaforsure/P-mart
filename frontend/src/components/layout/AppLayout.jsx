import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import PawTrail from './PawTrail';
import ScrollToTop from './ScrollToTop';

export default function AppLayout() {
  return <><ScrollToTop /><PawTrail /><SiteHeader /><main id="main-content"><Outlet /></main><SiteFooter /></>;
}
