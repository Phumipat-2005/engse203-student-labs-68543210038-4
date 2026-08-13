import { Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout.jsx';
import AboutPage from './pages/AboutPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NewRequestPage from './pages/NewRequestPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RequestDetailPage from './pages/RequestDetailPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route element={<AboutPage />} path="about" />
        <Route element={<NewRequestPage />} path="request/new" />
        <Route element={<RequestDetailPage />} path="request/:requestId" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
