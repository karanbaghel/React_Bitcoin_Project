// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Coins from "./Component/Coins";
import Exchange from "./Component/Exchange";
import CoinsDetails from "./Component/CoinsDetails";
import Header from "./Component/Header";
import Footer from "./Component/Footer";




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/coins/:id" element={<CoinsDetails />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
