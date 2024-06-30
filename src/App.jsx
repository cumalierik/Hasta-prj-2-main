import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HastaEkle from './routes/HastaEkle';
import DoktorEkle from './routes/DoktorEkle';
import HastaSorgula from './routes/HastaSorgula';
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/hasta-ekle">Hasta Kayıt</Link>
          </li>
          <li>
            <Link to="/doktor-ekle">Doktor ve Bölüm Ekle</Link>
          </li>
          <li>
            <Link to="/hasta-sorgula">Hasta Sorgulama</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HastaEkle />} />
        <Route path="/hasta-ekle" element={<HastaEkle />} />
        <Route path="/doktor-ekle" element={<DoktorEkle />} />
        <Route path="/hasta-sorgula" element={<HastaSorgula />} />
      </Routes>
    </div>
  </Router>
);

export default App;
