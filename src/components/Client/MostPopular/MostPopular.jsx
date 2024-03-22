import { useState, useEffect } from "react";
import { firestore } from "../../utils/firebase.js";
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

/* Arreglar que cuando se haga clic y aparezca una card de película no se pueda hacer scroll y cuando se cierre la card no se regrese al principio de la página */
/* Mostrar solo las 8 películas mas populares */

export const MostPopular = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isExtendedVisible, setIsExtendedVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDisabled, setScrollDisabled] = useState(false);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "peliculas"));
        const peliculasData = [];
        querySnapshot.forEach((doc) => {
          peliculasData.push({ id: doc.id, ...doc.data() });
        });
        setPeliculas(peliculasData);
      } catch (error) {
        console.error("Error getting peliculas: ", error);
      }
    };

    fetchPeliculas();
  }, []);

  useEffect(() => {
    let scrollPosition = 0;

    const toggleScrollClass = () => {
      if (scrollDisabled) {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Deshabilitar scroll
        window.addEventListener('scroll', disableScroll);
      } else {
        window.removeEventListener('scroll', disableScroll);
        window.scrollTo(0, scrollPosition);
      }
    };

    const disableScroll = (e) => {
      e.preventDefault();
      window.scrollTo(0, scrollPosition);
    };

    toggleScrollClass();

    return () => {
      window.removeEventListener('scroll', disableScroll);
    };
  }, [scrollDisabled]);

  const handleEventClick = (event) => {
    setSelectedMovie(event);
    setIsAnimating(true);
    setScrollDisabled(true);

    setTimeout(() => {
      setIsExtendedVisible(true);
      setIsAnimating(false);
    }, 500);
  };

  const closeDetailedView = () => {
    setSelectedMovie(null);
    setScrollDisabled(false);
  };

  return (
    <>
      <div>
        <section className="bg-white mx-10 md:mx-10 rounded-lg mt-4 md:mt-10 z-0 above-all">
          <div className="px-4 md:px-20 py-4 md:py-10">
            <h2 className="uppercase text-xl md:text-2xl font-medium lemon-milk text-center md:text-left sm:text-center">
              Most Popular Movies
            </h2>
            <h6 className="text-center md:text-left">Schedule your tickets</h6>
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
                      className="w-48 md:w-56 lg:h-96 md:h-72 mx-auto md:mx-0 cursor-pointer hover:opacity-80 duration-500 hover:scale-105"
                      alt={pelicula.titulo}
                      src={pelicula.img_url}
                    />
                  </div>
                  <h3 className="uppercase mt-2 sm:mt-4 font-medium lemon-milk text-center md:text-left">
                    {pelicula.titulo}
                  </h3>
                  <p className="mt-1 font-bold text-sm lemon-milk text-gray-600 text-center md:text-left">
                    {pelicula.duracion} min
                  </p>
                </li>
              ))}
            </ul>
            {selectedMovie && (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-75"></div>
                <div
                  className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isExtendedVisible ? "opacity-100" : "opacity-0"
                    } ${isAnimating ? "transition-opacity" : ""}`}
                  onClick={closeDetailedView}
                >
                  <Card className="mt-6 w-96">
                    <CardHeader color="blue-gray" className="relative h-56">
                      <img
                        className="mx-auto my-auto w-full h-full object-cover rounded-md"
                        src={selectedMovie.img_url}
                        alt={selectedMovie.titulo}
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        <p className="text-gray-700 mb-4">
                          <span className="font-bold text-3xl">
                            {selectedMovie.titulo}
                          </span>
                        </p>
                        <p className="text-gray-700">
                          {selectedMovie.generos ? selectedMovie.generos : "N/A"}
                        </p>
                        <p className="font-bold text-gray-700">
                          {selectedMovie.duracion} min
                        </p>
                      </Typography>
                      <Typography>
                        <div className="mt-2 text-gray-700 whitespace-normal">
                          {selectedMovie.sinopsis ? selectedMovie.sinopsis : "N/A"}
                        </div>
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Link to={`/schedule?id=${selectedMovie.id}`} className="rounded-md text-center flex-1 bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black">
                          <Button className="bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black shadow-none transition duration-500">
                            Agendar boletos
                          </Button>
                        </Link>
                        <Button className="flex-1 transition duration-500 bg-[var(--azul-fuerte)] hover:bg-[var(--azul)] hover:text-black"><p
                          className="rounded-md"
                          onClick={(e) => {
                            e.preventDefault();
                            closeDetailedView();
                          }}
                        >
                          Cerrar
                        </p></Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </>
            )}
          </div>
        </section >
      </div >
    </>
  );
};
