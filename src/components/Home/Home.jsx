import React, { useState, useEffect } from "react";
import { auth } from "../../credentials";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import { Hero } from "../Hero/Hero";
import { MostPopular } from "../MostPopular/MostPopular";
import { HomeNavbar } from "../Navbar/HomeNavbar";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export const Home = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fakeAsyncLoad = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setLoader(false);
    };

    void fakeAsyncLoad();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HomeNavbar />
          <Hero />
          <MostPopular />
          <Footer />
        </>
      )}
    </>
  );
};
