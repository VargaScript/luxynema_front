import { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
// import { Register } from "../Register/Register";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../credentials";
import { Login } from "../Login/Login";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = auth.currentUser;

  //   if (user) {
  //     navigate("/home");
  //   } else {
  //     console.log("Usuario no iniciado");
  //   }
  // }, [navigate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //   return passwordRegex.test(password);
  // };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="text-center background-image">
      <Card color="transparent" shadow={false} className="flex items-center">
        <h1 className="text-2xl md:text-4xl text-white galarama">
          LUXYNEMA
        </h1>
        <Typography variant="h4" color="white">
          Sign Up
        </Typography>
        <form className="mt-8 mb-2 w-full max-w-screen-sm mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <p color="white" className="-mb-5 galarama text-lg text-white">
              Full Name
            </p>
            <Input
              id="name"
              type="name"
              size="lg"
              placeholder="Your name"
              className=" !border-t-white-200 focus:!border-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={name}
              onChange={handleNameChange}
            />
            {/* {isValidEmail ? (
              <p>{""}</p>
            ) : (
              <p className="text-xs" style={{ color: "white" }}>
                Email no válido
              </p>
            )} */}
            <p color="white" className="-mb-5 galarama text-lg text-white">
              Email
            </p>
            <Input
              id="email"
              type="email"
              size="lg"
              placeholder="email@email.com"
              className=" !border-t-white-200 focus:!border-white"
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
              className=" !border-t-white-200 focus:!border-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={handlePasswordChange}
            />
            {/* {isValidPassword ? (
              <p>{""}</p>
            ) : (
              <p className="text-xs" style={{ color: "white" }}>
                La contraseña debe tener al menos 8 caracteres, una letra
                mayúscula, una letra minúscula y un número.
              </p>
            )} */}
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="white"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-all duration-300 hover:text-[color:var(--azul)]"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-6 bg-[color:var(--azul-fuerte)] transition-all duration-300 hover:bg-[color:var(--negro)]"
            fullWidth
            onClick={handleRegister}
          >
            sign up
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" element={<Login />} className="font-medium text-white transition-all duration-300 hover:text-[color:var(--azul)] underline">
              Log In
            </Link>
          </Typography>
        </form>
      </ Card >
    </div>
  );
}




