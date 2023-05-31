import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import Repertuar from './pages/Repertuar';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import AddScreening from './pages/AddScreening';
import Reservation from './pages/Reservation';
import ComingSoon from './pages/ComingSoon';
import Payment from './pages/Payment';
import Summary from './pages/Summary';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/repertuar"  element={<Repertuar />} />
        <Route path="/soon" element={<ComingSoon />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addscreening" element={<AddScreening />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Layout>
  );
}

export default App;
