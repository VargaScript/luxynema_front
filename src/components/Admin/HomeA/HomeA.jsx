import { useState, useEffect } from "react";
import "./HomeA.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { Main } from "../Main/Main";
import { Spinner } from "@material-tailwind/react";

export const HomeA = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

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
        <div className="background-background">
          <Main />
        </div>
      </div>
    </div>
  );
};
