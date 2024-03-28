import "./AboutUs.css";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";

export const AboutUs = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);

      await new Promise(resolve => setTimeout(resolve, 500));

      setLoader(false);
    };

    asyncLoader();
  }, []);

  return (
    <>
      {loader && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner className="h-12 w-12 mb-4" color="indigo" />
        </div>
      )}
      <div className={`${loader ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        <HomeNavbar />
        <div className="background bg-no-repeat bg-cover -mt-24">
          <div>
            <div className="pt-24 ml-[10%] mr-[10%] flex-direction-column">
              <div className='sm:text-6xl text-3xl pt-1 sm:pt-36 uppercase font-normal text-white galarama '>Luxynema</div>
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
      </div>
    </>
  );
};
