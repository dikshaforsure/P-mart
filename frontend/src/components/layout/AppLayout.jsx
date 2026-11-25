import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import PawTrail from './PawTrail';

export default function AppLayout() {
  return <><PawTrail /><SiteHeader /><main id="main-content"><Outlet /></main><SiteFooter /></>;
}
