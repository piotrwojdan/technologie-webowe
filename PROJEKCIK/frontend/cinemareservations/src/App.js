import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import Repertuar from './pages/Repertuar';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/repertuar" element={<Repertuar />} />
        <Route path="/soon" element={<MainPage />} />
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </Layout>
  );
}

export default App;
