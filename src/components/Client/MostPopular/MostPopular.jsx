import { useState, useEffect } from "react";
import { firestore } from "../../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./MostPopular.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export const MostPopular = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isExtendedVisible, setIsExtendedVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCloseHandled, setIsCloseHandled] = useState(false);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "movies"));
        const peliculasData = [];
        let count = 0;
        querySnapshot.forEach((doc) => {
          if (count < 8) {
            peliculasData.push({ id: doc.id, ...doc.data() });
            count++;
          }
        });
        setPeliculas(peliculasData);
      } catch (error) {
        console.error("Error getting movies: ", error);
      }
    };

    fetchPeliculas();
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMovie]);

  const handleEventClick = (event) => {
    setSelectedMovie(event);
    setIsAnimating(true);
    setIsCloseHandled(false);

    setTimeout(() => {
      setIsExtendedVisible(true);
      setIsAnimating(false);
    }, 500);
  };

  const closeDetailedView = () => {
    setIsCloseHandled(true);
    setSelectedMovie(null);
  };

  return (
    <>
      <div>
        <section className="bg-white mx-10 md:mx-10 rounded-lg mt-4 md:mt-10 z-0 above-all">
          <div className="px-4 md:px-20 py-4 md:py-10 relative">
            <h2 className="uppercase text-xl md:text-2xl font-medium lemon-milk text-center md:text-left sm:text-center text-black">
              Most Popular Movies
            </h2>
            <h6 className="text-center md:text-left text-black">
              Schedule your tickets
            </h6>
            <hr className="bg-[color:var(--azul-fuerte)] lg:w-72 w-40 md:w-56 h-2 mb-8 mx-auto md:mx-0 mt-4 md:mt-5"></hr>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-6 gap-y-10 mt-4 md:mt-5">
              {peliculas.map((pelicula) => (
                <li
                  className="grid"
                  key={pelicula.id}
                  onClick={() => handleEventClick(pelicula)}
                >
                  <div className="overlay-gradient">
                    <img
                      className="w-48 md:w-56 lg:h-96 md:h-72 mx-auto md:mx-0 cursor-pointer hover:opacity-80 duration-500 hover:scale-105 "
                      alt={pelicula.title}
                      src={pelicula.img_url}
                    />
                  </div>
                  <h3 className="uppercase mt-2 sm:mt-4 font-medium lemon-milk text-center md:text-left text-black">
                    {pelicula.title}
                  </h3>
                  <p className="mt-1 font-bold text-sm lemon-milk text-black text-center md:text-left">
                    {pelicula.duration} min
                  </p>
                </li>
              ))}
            </ul>
            {selectedMovie && (
              <>
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50"></div>
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                  <div
                    className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
                      isExtendedVisible ? "opacity-100" : "opacity-0"
                    } ${isAnimating ? "transition-opacity" : ""}`}
                    onClick={() => !isCloseHandled && closeDetailedView()}
                  />
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <Card className="mt-6 w-96 card-container">
                      <CardHeader color="blue-gray" className="relative h-56">
                        <img
                          className="mx-auto my-auto w-full h-full object-cover rounded-md"
                          src={selectedMovie.img_url_hd}
                          alt={selectedMovie.title}
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-2"
                        >
                          <p className="text-gray-700 mb-4">
                            <span className="font-bold text-3xl">
                              {selectedMovie.title}
                            </span>
                          </p>
                          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 capitalize">
                            {Array.isArray(selectedMovie.genre)
                              ? selectedMovie.genre.length > 1
                                ? selectedMovie.genre.slice(0, -1).join(", ") +
                                  ", " +
                                  selectedMovie.genre[
                                    selectedMovie.genre.length - 1
                                  ]
                                : selectedMovie.genre[0]
                              : selectedMovie.genre}
                          </p>
                          <p className="font-bold text-gray-700">
                            {selectedMovie.duration} min
                          </p>
                        </Typography>
                        <Typography>
                          <div className="mt-2 text-black whitespace-normal">
                            {selectedMovie.sinopsis
                              ? selectedMovie.sinopsis
                              : "N/A"}
                          </div>
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Link
                            to={`/schedule?id=${selectedMovie.id}`}
                            className="rounded-md text-center flex-1 bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black"
                          >
                            <Button className="bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black shadow-none transition duration-500">
                              Agendar boletos
                            </Button>
                          </Link>
                          <Button
                            className="flex-1 transition duration-500 bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black"
                            onClick={closeDetailedView}
                          >
                            <p className="rounded-md">Cerrar</p>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
