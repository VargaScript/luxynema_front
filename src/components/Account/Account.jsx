import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { auth } from "../../credentials";
import "./Account.css";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";

export const Account = () => {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setSesionIniciada(false);
      console.log("Logout clicked");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBackHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const verificarSesion = () => {
      const usuarioActual = auth.currentUser;
      if (usuarioActual) {
        setSesionIniciada(true);
        setUsuario({
          correo: usuarioActual.email,
        });
      } else {
        setSesionIniciada(false);
        setUsuario(null);
      }
    };

    verificarSesion();
  }, []);

  useEffect(() => {
    if (!sesionIniciada) {
      navigate("/account");
    }
  }, [sesionIniciada, navigate]);

  if (!sesionIniciada || !usuario) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <HomeNavbar />
      <div className="background-image flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-8 mt-40">
          <div className="user-container rounded-2xl text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-60 xl:h-60 bg-slate-900 rounded-full flex items-center justify-center mx-auto md:mx-0">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-300 text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-2"
              />
            </div>
            <br />

            <label>Email</label>
            <p className="text-black font-bold text-2xl md:text-3xl mb-8">
              {usuario.correo}
            </p>

            <button
              className="bg-transparent text-black text-md md:text-lg font-bold py-2"
              onClick={handleLogout}
            >
              LOG OUT
            </button>
          </div>
          <br />
          <button
            className="text-white bg-transparent text-center font-bold text-lg"
            onClick={handleBackHome}
          >
            BACK HOME
          </button>
        </div>
        <div className="w-full md:w-2/3 p-8 mt-8 md:h-auto bg-transparent">
          <div className="user-container2 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 mt-4">Películas Vistas</h2>

            <div className="flex flex-wrap gap-4"></div>

            <div className="w-full md:w-1/4 lg:w-1/3 xl:w-1/4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-2">
                  Película Predeterminada
                </h3>
                <p className="text-gray-500">Género: Desconocido</p>
                <p className="text-gray-500">Director: Desconocido</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
