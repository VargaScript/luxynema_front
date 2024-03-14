import { useEffect } from "react";
import "./Root.css";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Typography, Button } from "@material-tailwind/react";
import { auth } from "../../utils/firebase.js";

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="background-image flex items-center justify-center min-h-screen">
      <main className="flex-1 text-center px-4 py-8">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl mb-8 text-white galarama">
          LUXYNEMA
        </h1>
        <ul className="mt-4 md:mt-8">
          <div className="mt-28 relative">
            <h1 className="galarama text-white font-normal text-2xl mb-4">
              Create an account and have access to the latest movies
            </h1>
            <li className="flex justify-center">
              <Link
                to="/register"
                element={<Register />}
                className="w-full sm:w-80 h-10"
              >
                <Button className="bg-[color:var(--azul)] transition-all duration-300 hover:bg-[color:var(--azul-fuerte)]">Create Account</Button>
              </Link>
            </li>
          </div>
          <li className="flex justify-center mt-12">
            <Typography variant="h5" color="white">
              Already have an account?
            </Typography>
            <Typography variant="h5" color="white">
              <Link
                to="/login"
                element={<Login />}
                className="underline ml-2 text-[color:var(--azul)] transition-all duration-300 hover:text-[color:var(--azul-fuerte)]"
              >
                Log in
              </Link>
            </Typography>
          </li>
        </ul>
      </main>
    </div>
  );
};
