import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import Cinemas from './components/Cinemas';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Cinemas />} />

      </Routes>
    </Layout>
  );
}

export default App;
