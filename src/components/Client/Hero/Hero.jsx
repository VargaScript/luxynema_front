import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "./Hero.css";
import { firestore } from "../../../utils/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { Carousel, IconButton } from "@material-tailwind/react";
import YouTube from 'react-youtube';

/* Arreglar la sección de ver trailer para que se vea centrada en movil y en web */
/* Arreglar el modal en el que se muestra el trailer para que se meuestre en el índice en que se hizo clic para ver */
/* Arreglar el modal en el que se muestra el trailer para que no se mueva el carrusel una vez se haya esté activo un trailer o modal */

export function Hero() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrailer, setCurrentTrailer] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        let token = localStorage.getItem('token');

        if (!token) {
          const tokenResponse = await fetchToken();
          if (tokenResponse.status === 200 && tokenResponse.data.idToken) {
            token = tokenResponse.data.idToken;
            localStorage.setItem('token', token);
          } else {
            console.error('No se pudo obtener el token');
            return;
          }
        }

        const response = await fetch('http://127.0.0.1:8000/movies/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          console.error('Error al obtener las películas:', response.statusText);
          return;
        }

        const data = await response.json();
        setPeliculas(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las películas: ", error);
        setLoading(false);
      }
    };
    fetchPeliculas();
  }, []);

  const fetchToken = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'riada@gmail.com',
          password: 'Cine1234'
        })
      });

      if (!response.ok) {
        console.error('Error al obtener el token:', response.statusText);
        return { status: response.status, data: null };
      }

      const data = await response.json();
      const token = data.token;
      return { status: 200, data: { idToken: token } };
    } catch (error) {
      console.error("Error al obtener el token: ", error);
      return { status: 500, data: null };
    }
  };

  /*  const fadeOverlayStyle = {
     position: "absolute",
     bottom: "0",
     left: "0",
     width: "100%",
     height: "10%",
     background: "linear-gradient(to bottom, rgba(17, 34, 54, 0), rgba(17, 34, 54, 0.7))",
     pointerEvents: "auto",
   }; */

  return (
    <div /* className="-mt-[90px]" */>
      <Carousel className="above-all"
        autoplay
        autoplayDelay={4000}
        loop
        activeIndex={activeIndex}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                onClick={() => {
                  setActiveIndex(i);
                }}
              />
            ))}
          </div>
        )}
      >
        {/*  {peliculas.map((pelicula, index) => (
          <div key={pelicula.id} className="z-50">
            <div style={{
              backgroundImage: `
    linear-gradient(rgba(17, 34, 54, 0.7), rgba(17, 34, 54 , 0.7)), 
    url(${!loading && pelicula.img_url_hd ? pelicula.img_url_hd : ""})
  `,
              backgroundSize: "cover",
              height: "100vh",
              position: "relative",
            }} className="flex relative md:justify-center">
              <div className="flex items-center justify-center inset-x-0 top-1/2 z-50 mt-20 absolute">
                <section>
                  {loading ? (
                    <h1>Hubo un problema, intenta más tarde</h1>
                  ) : (
                    <>
                      <h1 className="ml-2 text-center lg:ml-24 text-xl lg:text-8xl uppercase lemon-milk text-white font-thin">
                        <a className="">{pelicula.titulo}</a>
                      </h1>
                      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 ml-4 sm:ml-8 md:ml-16 lg:ml-24">
                        <p className="text-lg sm:text-xl lg:text-2xl text-white capitalize">
                          {pelicula.generos}
                        </p>
                        <div className="mt-4">
                          <div>
                            <a
                              href={pelicula.trailer}
                              className="cursor-pointer bg-[color:var(--negro)] text-white rounded-xl px-3 py-3 uppercase text-sm sm:text-base lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-2000"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentTrailer(peliculas[index].trailer);
                                setCurrentName(peliculas[index].titulo);
                              }}
                            >
                              Watch Trailer
                              <span className="ml-2 sm:ml-4 bg-[color:var(--blanco)] hover:bg-[color:var(--negro)] rounded-full px-2 py-1">
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  className="text-black hover:text-[color:var(--blanco)]"
                                />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </section>
              </div>
              <div style={fadeOverlayStyle}></div>
            </div>
          </div>
        ))} */}
        {currentTrailer && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-75"></div>
            <div className="relative w-full max-w-screen-lg mx-4">
              <div className="bg-white p-8 rounded-md h-full">
                <h2 className="text-2xl font-bold -mb-4">
                  Trailer: <span className="text-[color:var(--azul-fuerte)]">{currentName}</span>
                </h2>
                <div className="flex flex-col md:flex-row w-full h-full relative">
                  <div className="w-full md:w-full mt-6 md:mt-6 relative">
                    <YouTube
                      videoId={extractVideoIdFromUrl(currentTrailer)}
                      opts={{
                        width: '100%',
                        playerVars: {
                          autoplay: 1,
                        },
                      }}
                    />
                  </div>
                  <div className="absolute -top-5 right-0">
                    <IconButton
                      className="bg-[color:var(--azul-claro)] w-8 h-8"
                      onClick={() => setCurrentTrailer('')}
                    >
                      <div className="text-[color:var(--azul-fuerte)] hover:text-[color:var(--azul)] duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
}

function extractVideoIdFromUrl(url) {
  const regex = /[?&]v=([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}