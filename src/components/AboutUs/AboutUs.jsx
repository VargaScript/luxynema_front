import React from "react";
import "./AboutUs.css";
import { Navbar } from "../Navbar/Navbar";

export const AboutUs = () => {
  return (
      <>
      <Navbar />
      <div className="background  bg-no-repeat bg-cover">
        <div>
        <div className="textContainer">
            <div className='sm:text-6xl uppercase font-normal text-white galarama '>Luxynema</div>
            <p className='sm:text-2md mr-9 font-normal text-white '>
              At Luxynema we are dedicated to providing you with an unparalleled
              cinematic experience that trascends the ordinary.
          <br />
              Nestled in the
              heart of the city, Luxynema stands as a beacon of entrerainment,
              culture, and community.
            </p>


        </div>
        </div>
        </div>
      </>
  );
};
