import React, { useState, useEffect } from "react";
import "./Root.css";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { auth } from "../../credentials";


export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      navigate("/home");
    } else {
      console.log("Usuario no iniciado");
    }
  }, [navigate]);

  return (
    <div className="background-image flex items-center justify-center h-screen">
      <main className="flex-1 p-4 md:p-8 lg:p-16 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-white galarama">
          LUXYNEMA
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl text-white mt-2 md:mt-4 lg:mt-8">
          Create an account and have access to the latest movies
        </p>
        <ul className="mt-4 md:mt-8">
          <li>
            <Link
              to="/register"
              element={<Register />}
              className="inline-block w-full md:w-auto rounded-xl bg-white py-3 px-4 md:px-8 text-lg md:text-2xl uppercase galarama cursor-pointer hover:bg-[color:var(--azul)] hover:text-[color:var(--blanco)] duration-300"
            >
              Create Account
            </Link>
          </li>
          <li className="flex justify-center mt-2 md:mt-4 lg:mt-6">
            <p className="text-lg md:text-2xl lg:text-3xl text-white">
              Already have an account?
            </p>
            <Link
              to="/login"
              element={<Login />}
              className="text-lg md:text-2xl lg:text-3xl text-white underline ml-2 cursor-pointer hover:text-[color:var(--azul)] duration-300"
            >
              Log in
            </Link>
          </li>
        </ul>
      </main>
      <aside className="hidden sm:hidden md:block absolute right-8 md:right-16 lg:right-28 top-1/2 transform -translate-y-1/2">
        <img
          className="w-auto h-60 md:h-80 lg:h-96"
          alt="Barras apuntando hacia la derecha"
        />
      </aside>
    </div>
  );
};
