import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function AppLayout() {
  return <><SiteHeader /><main id="main-content"><Outlet /></main><SiteFooter /></>;
}
