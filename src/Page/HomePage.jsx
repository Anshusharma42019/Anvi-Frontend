import React from "react";
import Home from "./Home";
import Catalog from "./catelog";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";
import Search from "./Search";

const HomePage = () => {
  return (
    <div>
      <section id="home"><Home /></section>
      <section id="catalog"><Catalog /></section>
      <section id="products"><Products /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
};

export default HomePage;