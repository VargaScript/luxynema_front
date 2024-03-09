import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Login } from "../Login/Login"
import { auth } from "../../credentials";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();

  const isFormValid = isValidEmail && isValidPassword;

  const handleNameChange = (e) => setName(e.target.value);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(newEmail === "" ? false : validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(
      newPassword === "" ? false : validatePassword(newPassword)
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      navigate("/home");
    } catch (error) {
      const { code, message } = error;
      console.error(code, message);
    }
  };

  return (
    <div className="text-center background-image">
      <Card color="transparent" shadow={false} className="flex items-center">
        <h1 className="text-2xl md:text-4xl text-white galarama">LUXYNEMA</h1>
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
            {email.length > 0 && isValidEmail ? (
              <p>{""}</p>
            ) : email.length > 0 ? (
              <p className={`text-xs ${isValidEmail ? "invisible" : ""}`} style={{ color: "red" }}>
                Email no válido
              </p>
            ) : null}
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
            {password.length > 0 && isValidPassword ? (
              <p>{""}</p>
            ) : password.length > 0 ? (
              <p className={`text-xs ${isValidPassword ? "invisible" : ""}`} style={{ color: "red" }}>
                <span style={{ display: "block" }}>La contraseña debe tener al menos</span>
                <span style={{ display: "block" }}>8 caracteres, una letra mayúscula,</span>
                <span style={{ display: "block" }}>una letra minúscula y un número.</span>
              </p>
            ) : null}
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
                  className="underline font-medium transition-all duration-300 hover:text-[color:var(--azul)]"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className={`mt-6 bg-[color:var(--azul-fuerte)] transition-all duration-300 hover:bg-[color:var(--negro)]`}
            fullWidth
            onClick={handleRegister}
            disabled={!isFormValid}
          >
            Sign Up
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




