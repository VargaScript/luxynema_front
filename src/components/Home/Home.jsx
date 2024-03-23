import React, { useEffect } from "react";
import { auth } from "../../utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import { Hero } from "../Hero/Hero";
import { MostPopular } from "../MostPopular/MostPopular";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <MostPopular />
        <Footer />
      </div>
    </>
  );
};
