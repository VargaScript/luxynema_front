import { useEffect, useState } from "react";
import { firestore, auth } from "../../../utils/firebase.js";
import { collection, getDocs, where, query } from "firebase/firestore";
import "./Account.css";

import { HomeNavbar } from "../HomeNavbar/HomeNavbar.jsx";
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
  Button,
} from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Account = () => {
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
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const usersCollection = collection(firestore, "users");
          const q = query(usersCollection, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUsuario(doc.data());
            });
          } else {
            toast.error("No se encontraron datos de usuario.");
          }
        } else {
          toast.error("Usuario no autenticado.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        toast.error("Error al obtener los datos del usuario.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  return (
    <>
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
        <HomeNavbar />
        <ToastContainer />
        <div className="background-image flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row w-full -mt-24">
            <Card className="md:w-1/2 mx-auto mb-4 md:mb-0">
              <CardHeader floated={true} className="h-80">
                <img
                  src="https://docs.material-tailwind.com/img/team-3.jpg"
                  alt="Profile Picture"
                />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  <label>User Name:</label>
                  <p className="text-lg font-thin">
                    {usuario ? usuario.userName : "Cargando..."}
                  </p>
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  <label>Email:</label>
                  <p className="text-lg font-thin">
                    {usuario ? usuario.email : "Cargando..."}
                  </p>
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  <label>Points:</label>
                  <p className="text-lg font-thin">
                    {usuario ? usuario.points : "Cargando..."}
                  </p>
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <Button
                  className="flex-1 transition duration-500 bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black"
                  onClick={handleLogout}
                >
                  Log Out
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
                    <Avatar
                      variant="circular"
                      alt="candice"
                      src="https://docs.material-tailwind.com/img/face-1.jpg"
                    />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Nombre película
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
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
