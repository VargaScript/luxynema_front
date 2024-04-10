import { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase.js";

import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Log in success');
        // Aquí deberías validar el campo isSuperuser y redirigir según su valor
        if (/* condición para verificar isSuperuser */) {
          navigate("/home-a");
        } else {
          navigate("/home-c");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      // Aquí también deberías validar el campo isSuperuser y redirigir según su valor
      if (/* condición para verificar isSuperuser */) {
        navigate("/home-a");
      } else {
        navigate("/home-c");
      }
    }
  }, [navigate]);

  return (
    <div className="text-center background-image">
      <ToastContainer />
      <Card color="transparent" shadow={false} className="flex items-center">
        <h1 className="text-2xl md:text-4xl text-white galarama">
          LUXYNEMA
        </h1>
        <Typography variant="h4" color="white">
          Sign In
        </Typography>
        <form className="mt-8 mb-2 w-full max-w-screen-sm mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <p color="white" className="-mb-5 galarama text-lg text-white">
              Email
            </p>
            <Input
              id="email"
              type="email"
              size="lg"
              placeholder="email@email.com"
              className=" !border-t-white-200 focus:!border-white text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={handleEmailChange}
            />
            <p color="white" className="-mb-5 galarama text-lg text-white ">
              Password
            </p>
            <Input
              id="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-white-200 focus:!border-white text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button
            className="mt-6 bg-[color:var(--azul-fuerte)] transition-all duration-300 hover:bg-[color:var(--negro)]"
            fullWidth
            onClick={handleLogin}
          >
            sign in
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Don&apos;t have an account?{" "}
            <Link to="/register" element={<Register />} className="font-medium text-white transition-all duration-300 hover:text-[color:var(--azul)] underline">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
