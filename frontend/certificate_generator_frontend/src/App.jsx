// src/App.jsx
import { Routes, Route, NavLink } from "react-router-dom";
import GenerateCert from "./pages/GenerateCert";
import UploadCsv from "./pages/ْUploadCsv";
import Certificates from "./pages/Certificates";
import ShowCerts from "./pages/ShowCerts"
import ShowCertsList from "./pages/ShowCertsList"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <header className="shadow-sm bg-white">
       
            <Navbar />
          
      </header>

      <main className="max-w-5xl mx-auto p-4 pt-20 font-gedinar min-h-[90vh]">
        <Routes>
          {/* <Route path="/generateCert" element={<GenerateCert />} /> */}
          <Route path="/" element={<GenerateCert />} />
          <Route path="/uploadCsv" element={<UploadCsv />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/show-cert" element={<ShowCerts />} />
          <Route path="/show-cert-list" element={<ShowCertsList />} />
          
        </Routes>
        
      </main>
      <Footer/>
    </div>
  );
}
