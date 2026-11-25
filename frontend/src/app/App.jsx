import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
import PuppiesPage from '../pages/PuppiesPage';
import PuppyProfilePage from '../pages/PuppyProfilePage';
import HowItWorksPage from '../pages/HowItWorksPage';
import FaqPage from '../pages/FaqPage';
import GoneHomePage from '../pages/GoneHomePage';
import HappyFamiliesPage from '../pages/HappyFamiliesPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function App() {
  return <BrowserRouter><Routes><Route element={<AppLayout />}>
    <Route index element={<HomePage />} />
    <Route path="puppies" element={<PuppiesPage />} />
    <Route path="puppies/:slug" element={<PuppyProfilePage />} />
    <Route path="gone-home" element={<GoneHomePage />} />
    <Route path="happy-families" element={<HappyFamiliesPage />} />
    <Route path="how-it-works" element={<HowItWorksPage />} />
    <Route path="faq" element={<FaqPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes></BrowserRouter>;
}
