import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import PawTrail from './PawTrail';
import ScrollToTop from './ScrollToTop';
import PageTransition from './PageTransition';

export default function AppLayout() {
  const [transitionActive, setTransitionActive] = useState(true);

  return (
    <>
      <ScrollToTop />
      <PageTransition onActiveChange={setTransitionActive} />
      <div className="app-page-content" data-testid="app-page-content" inert={transitionActive}>
        <PawTrail />
        <SiteHeader />
        <main id="main-content"><Outlet /></main>
        <SiteFooter />
      </div>
    </>
  );
}
