import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/branding" element={<Brand />} />
        <Route path="/web-dev" element={<Solutions />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/smm" element={<SMM />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
