import React, { useState } from "react";

import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Solutions from "./pages/Solutions";
import Brand from "./pages/Brand";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Seo from "./pages/Seo";
import SMM from "./pages/SMM";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import EduCorePage from "./pages/EduCorePage";
import Services from "./pages/Services";
import ScrollToHash from "./components/ScrollToHash";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/branding" element={<Brand />} />
        <Route path="/web-dev" element={<Solutions />} />
        <Route path="/our-system" element={<EduCorePage />} />
        <Route path="/smm" element={<SMM />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
