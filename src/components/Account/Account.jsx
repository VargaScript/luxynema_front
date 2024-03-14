import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase.js";
import "./Account.css";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Button
} from "@material-tailwind/react";

export const Account = () => {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoader(false);
    };

    asyncLoader();
  }, []);

  useEffect(() => {
    const verificarSesion = () => {
      const usuarioActual = auth.currentUser;
      if (usuarioActual) {
        setSesionIniciada(true);
        setUsuario({
          correo: usuarioActual.email,
          nombre: usuarioActual.displayName || "Nombre de usuario predeterminado",
        });
      } else {
        setSesionIniciada(false);
        setUsuario(null);
      }
    };

    verificarSesion();
  }, []);

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

  return (
    <>
      {loader && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner className="h-12 w-12 mb-4" color="indigo" />
        </div>
      )}
      <div className={`${loader ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        <HomeNavbar />
        <div className="background-image flex flex-col md:flex-row">
          <div className=" flex flex-col md:flex-row w-full">
            <Card className="md:w-1/2 mx-auto mb-4 md:mb-0">
              <CardHeader floated={true} className="h-80">
                <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="Profile Picture" />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  <label>Nombre</label>
                  <p className="text-lg font-thin">
                    {usuario ? usuario.nombre : "Cargando..."}
                  </p>
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  <label>Email</label>
                  <p className="text-lg font-thin">
                    {usuario ? usuario.correo : "Cargando..."}
                  </p>
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <Button
                  className="flex-1 transition duration-500 bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black"
                  onClick={handleLogout}
                >Log Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className=" flex flex-col md:flex-row w-full">
            <Card className="md:w-1/2 ">
              <List>
                <Typography variant="h1">Historial de Películas</Typography>
                <ListItem>
                  <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Nombre película
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      Género
                    </Typography>
                  </div>
                </ListItem>
              </List>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
