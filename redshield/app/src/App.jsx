import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Website from './pages/Website';
import Dashboard from './pages/Dashboard';
import Console from './pages/Console';
import CRM from './pages/CRM';
import Reports from './pages/Reports';
import Architecture from './pages/Architecture';
import Business from './pages/Business';

export default function App() {
  return (
    <>
      <div className="gradient-mesh" />
      <div className="noise" />
      <div className="relative z-[1] flex min-h-screen">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <TopBar />
          <div className="px-7 py-7 pb-16" style={{ animation: 'fadeup .4s ease' }}>
            <Routes>
              <Route path="/" element={<Website />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/console" element={<Console />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="/business" element={<Business />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
