import { createRoot } from 'react-dom/client';
import './index.css';
import Sign from './signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root element not found');
}
