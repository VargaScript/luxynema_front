import { Link } from "react-router-dom";
import "./Main.css";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import User from "../../../assets/user.jpg";
import Movie from "../../../assets/movie.jpg";

export const Main = () => {
  return (
    <>
      <div className="flex h-screen background">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-center">
            <Typography variant="h1" color="white" className="-mt-10 mb-10">
              Manage Luxynema
            </Typography>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-col items-center mr-4 mb-8">
                <Typography variant="h2" color="white" className="mb-4">
                  Movies
                </Typography>
                <Card className="w-96">
                  <List>
                    <Link to="/add-movies">
                      <ListItem className="text-[color:var(--azul-fuerte)] hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300">
                        <ListItemPrefix>
                          <Avatar variant="circular" alt="User" src={Movie} />
                        </ListItemPrefix>
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            Add Movie
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            Add Movies to Luxynema to show them on the Webpage
                          </Typography>
                        </div>
                      </ListItem>
                    </Link>
                    <Link to="/all-movies">
                      <ListItem className="text-[color:var(--azul-fuerte)] hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300">
                        <ListItemPrefix>
                          <Avatar
                            variant="circular"
                            alt="alexander"
                            src={Movie}
                          />
                        </ListItemPrefix>
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            See Movies
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            Read, Update and Delete all Movies on Luxynema
                          </Typography>
                        </div>
                      </ListItem>
                    </Link>
                  </List>
                </Card>
              </div>
              <div className="flex flex-col items-center ml-4 mb-8">
                <Typography variant="h2" color="white" className="mb-4">
                  Users
                </Typography>
                <Card className="w-96">
                  <List>
                    <Link to="/add-users">
                      <ListItem className="text-[color:var(--azul-fuerte)] hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300">
                        <ListItemPrefix>
                          <Avatar variant="circular" alt="candice" src={User} />
                        </ListItemPrefix>
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            Add User
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            Add Users so they can have access to Manage Luxynema
                          </Typography>
                        </div>
                      </ListItem>
                    </Link>
                    <Link to="/list-users">
                      <ListItem className="text-[color:var(--azul-fuerte)] hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300">
                        <ListItemPrefix>
                          <Avatar
                            variant="circular"
                            alt="alexander"
                            src={User}
                          />
                        </ListItemPrefix>
                        <div>
                          <Typography variant="h6" color="blue-gray">
                            See Users
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="font-normal"
                          >
                            Read, Update and Delete all Users on Luxynema
                          </Typography>
                        </div>
                      </ListItem>
                    </Link>
                  </List>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
