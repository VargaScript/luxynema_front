import { useState, useEffect } from "react";
import "./Home.css";
import { Hero } from "../Hero/Hero";
import { MostPopular } from "../MostPopular/MostPopular";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import { Footer } from "../Footer/Footer";
import { Spinner } from "@material-tailwind/react";

export const Home = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoader(false);
    };

    asyncLoader();
  }, []);

  return (
    <div className="relative h-screen">
      {loader && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner className="h-12 w-12 mb-4" color="indigo" />
        </div>
      )}
      <div
        className={`${
          loader ? "opacity-0" : "opacity-100"
        } transition-opacity duration-700`}
      >
        <HomeNavbar />
        <Hero />
        <MostPopular />
        <Footer />
      </div>
    </div>
  );
};
