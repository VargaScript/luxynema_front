import { useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export const Payment = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location = "/home";
    }, 5000);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Card className="mt-6 w-96 card-container">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            <p className="w-72">
              <span className="font-bold text-3xl"></span>
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-black-500 capitalize">
              Thanks for Purchase at Luxynema!
            </p>
            <p className="font-bold text-black-500">Here is your ticket:</p>
          </Typography>
          <img src="../../../../../public/qr.png" alt="codigo qr" />
        </CardBody>
      </Card>
    </div>
  );
};
