import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Componemts/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./Componemts/Footer";
import Catalog from "./Page/catelog";
import Products from "./Page/Products";
import ProductDetail from "./Page/ProductDetail";
import About from "./Page/About";
import Contact from "./Page/Contact";
import Search from "./Page/Search";
import HomePage from "./Page/HomePage";

import Admin from "./Page/Admin";



function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/catalogue/:category" element={<Catalog />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
