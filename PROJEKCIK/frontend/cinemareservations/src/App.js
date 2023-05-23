import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from 'axios'
import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import Repertuar from './pages/Repertuar';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';

function App() {
  const [cinemas, setCinemas] = useState([]);
  const [cinema, setCinema] = useState("/repertuar");

  function HandleSelect(cinemaId){
    setCinema("/repertuar/" + cinemaId);
  }
    useEffect(() => {
      axios.get('http://localhost:8080/cinemas').then(res => {
        const c = res.data;
        console.log(c);
        setCinemas(c);
      }).catch(
        console.log("cos nie tak")
      );
    }, [])

    

  return (
    <Layout cinemas={cinemas} changeCinema={HandleSelect}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/repertuar/:id"  element={<Repertuar />} />
        <Route path="/soon" element={<MainPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
