import { useEffect, useState } from "react";
import { firestore, auth } from "../../../utils/firebase.js";
import { collection, getDocs, where, query } from "firebase/firestore";
import "./Account.css";
import userImage from "../../../assets/user.jpg";
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

  const movieNames = [
    "Avengers Endgame",
    "Dune",
    "Godzilla",
    "Barbie",
    "Barbie",
    "The Lion King",
  ];
  const movieGenres = [
    "Acción",
    "Ciencia ficción",
    "Acción",
    "Family",
    "Family",
    "Aventura",
  ];

  const movieMap = Array.from({ length: 6 }, (_, index) => index);

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
            const userData = querySnapshot.docs[0].data();
            setUsuario(userData);
          } else {
            toast.error("User data not found.");
          }
        } else {
          toast.error("User not authenticated.");
        }
      } catch (error) {
        toast.error("Error fetching user data. Please try again later.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      toast.error("Error logging.");
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
        } transition-opacity duration-700 flex flex-col justify-center items-center h-screen`}
      >
        <HomeNavbar />
        <ToastContainer />
        <div className="background-image flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row w-full mt-20 sm:mt-20">
            <Card className="mx-auto mb-12">
              <CardHeader floated={true} className="h-80">
                <img src={userImage} alt="Profile Picture" className="mt-9" />
              </CardHeader>
              <CardBody className="text-center">
                {usuario ? (
                  <>
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      <label>User Name:</label>
                      <p className="text-lg font-thin">{usuario.userName}</p>
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      <label>Email:</label>
                      <p className="text-lg font-thin">{usuario.email}</p>
                    </Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      <label>Points:</label>
                      <p className="text-lg font-thin">{usuario.points}</p>
                    </Typography>
                  </>
                ) : (
                  <Spinner color="indigo" size="large" />
                )}
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
          <div className="flex flex-col md:flex-row w-full mr-10">
            <Card className="mx-auto flex-grow w-full h-full mb-4 md:mb-0">
              <List className="h-full">
                <Typography variant="h5">Historial de Películas</Typography>
                {movieMap.map((index) => (
                  <ListItem key={index} className="h-full">
                    <ListItemPrefix>
                      <Avatar variant="circular" />
                    </ListItemPrefix>
                    <div className="h-full flex flex-col justify-between">
                      <Typography variant="h6" color="blue-gray">
                        {movieNames[index]}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        Género: {movieGenres[index]}
                      </Typography>
                    </div>
                  </ListItem>
                ))}
              </List>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
