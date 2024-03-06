import { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";
// import { Typography } from "@material-tailwind/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../credentials";



export const Register = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

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
    <div className="background-image flex items-center justify-center h-screen">

      <main className="register-container">
        <div className="text-container mb-8 text-center">
          <Typography color="white" className="lemon-milk mb-4 text-2xl">
            Sign Up
          </Typography>
          <Typography color="white" className="lemon-milk text-lg">
            Sign up to enjoy the latest releases
          </Typography>
        </div>
        <div className="register-form">
          <div className="w-72 mb-4">
            <input
              className="input-field w-full py-4 px-6 text-sm color-white lemon-milk"
              id="email"
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={handleEmailChange}
            />
            {isValidEmail ? (
              <p>{""}</p>
            ) : (
              <p className="text-xs" style={{ color: "white" }}>
                Email no válido
              </p>
            )}
          </div>
          <div className="w-72 mb-4">
            <input
              className="input-field w-full py-4 px-6 text-sm color-white lemon-milk"
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {isValidPassword ? (
              <p>{""}</p>
            ) : (
              <p className="text-xs" style={{ color: "white" }}>
                La contraseña debe tener al menos 8 caracteres, una letra
                mayúscula, una letra minúscula y un número.
              </p>
            )}
          </div>
          <div className="form-group mb-6 ">
            <button
              size="lg"
              color="white"
              className="galarama cursor-pointer rounded-xl py-4 px-6 hover:bg-[color:var(--azul-fuerte)] hover:text-[color:var(--blanco)] duration-300 mb-4"
              onClick={handleRegister}
            >
              <span className="button-text text-xl">Sign In</span>
            </button>
          </div>
        </div>
        <div className="flex mt-6">
          <p className="text-xl text-white">Already have an account?</p>
          <Link
            to="/login"
            element={<Login />}
            className="text-xl text-white pl-2 underline cursor-pointer hover:text-[color:var(--azul-fuerte)] transition duration-500"
          >
            Log In
          </Link>
        </div>
      </main>
    </div>
  );
};
