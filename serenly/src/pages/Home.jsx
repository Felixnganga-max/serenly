import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductSections from "../components/ProductSections";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductSections />
      <NewsLetter />
    </div>
  );
};

export default Home;
