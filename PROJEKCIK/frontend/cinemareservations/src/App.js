import React,{ useState } from 'react';
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


function App() {
  const [user, setUser] = useState();

  function setUserApp(new_user) {
    setUser(new_user);
    console.log(user);
  }
  
  return (
    <Layout user={user} setUser={setUserApp}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/repertuar"  element={<Repertuar />} />
        <Route path="/soon" element={<ComingSoon />} />
        <Route path="/admin" element={<AdminPanel user={user} setUser={setUserApp}/>} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUserApp}/>} />
        <Route path="/addscreening" element={<AddScreening user={user} setUser={setUserApp}/>} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Layout>
  );
}

export default App;
