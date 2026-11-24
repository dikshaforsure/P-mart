import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
import PlaceholderPage from '../pages/PlaceholderPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="puppies" element={<PlaceholderPage title="Available puppies" />} />
          <Route path="puppies/:slug" element={<PlaceholderPage title="Meet a TeddyPup" />} />
          <Route path="gone-home" element={<PlaceholderPage title="Gone home" />} />
          <Route path="happy-families" element={<PlaceholderPage title="Happy families" />} />
          <Route path="how-it-works" element={<PlaceholderPage title="How it works" />} />
          <Route path="faq" element={<PlaceholderPage title="Questions, answered" />} />
          <Route path="contact" element={<PlaceholderPage title="Get in touch with us" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
