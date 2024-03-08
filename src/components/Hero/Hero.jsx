import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "./Hero.css";
import { db } from "../../credentials";
import { collection, getDocs } from "firebase/firestore";
import { Carousel } from "@material-tailwind/react";
import YouTube from 'react-youtube';

export function Hero() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrailer, setCurrentTrailer] = useState('');

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "peliculas"));
        const peliculasData = [];
        querySnapshot.forEach((doc) => {
          peliculasData.push({ id: doc.id, ...doc.data() });
        });
        setPeliculas(peliculasData);
        setLoading(false);
      } catch (error) {
        console.error("Error getting peliculas: ", error);
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  const heroStyle = {
    backgroundImage: `
    linear-gradient(rgba(17, 34, 54, 0.7), rgba(17, 34, 54 , 0.7)), 
    url(${!loading && peliculas.length > 0 ? peliculas[0].img_url_hd : ""})
  `,
    backgroundSize: "cover",
    height: "100vh",
    position: "relative",
  };

  const fadeOverlayStyle = {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "20%",
    background:
      "linear-gradient(to bottom, rgba(17, 34, 54, 0), rgba(17, 34, 54, 0.7))",
    pointerEvents: "none",
  };

  return (
    <Carousel
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <>
        <div className="z-50 mt-11">
          <div style={heroStyle} className="flex relative">
            <div className="flex items-center justify-center">
              <section>
                {loading ? (
                  <h1>Hubo un problema, intenta más tarde</h1>
                ) : (
                  <>
                    <h1 className="ml-4 sm:ml-8 md:ml-16 text-center lg:ml-24 text-6xl lg:text-8xl uppercase lemon-milk text-white font-thin">
                      <a className="">{peliculas[0].titulo}</a>
                    </h1>
                    <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 ml-4 sm:ml-8 md:ml-16 lg:ml-24">
                      <p className="text-lg sm:text-xl lg:text-2xl text-white capitalize">
                        {peliculas[0].generos}
                      </p>
                      <div className="mt-4">
                        <div>
                          <a
                            href={peliculas[0].trailer}
                            className="cursor-pointer bg-[color:var(--negro)] text-white rounded-xl px-3 py-3 uppercase text-sm sm:text-base lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-2000"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentTrailer(peliculas[0].trailer);
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
        </div>{" "}
        {currentTrailer && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-75"></div>
            <div className="relative">
              <button
                className="text-white cursor-pointer text-[color:var(--azul-fuerte)] hover:text-[color:var(--azul)] duration-300 absolute top-4 right-4"
                onClick={() => setCurrentTrailer('')}
              >
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
              </button>
              <div className="w-full h-full">
                <YouTube
                  videoId={extractVideoIdFromUrl(currentTrailer)}
                  opts={{
                    width: '560',
                    height: '315',
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </Carousel>
  );
}

function extractVideoIdFromUrl(url) {
  const regex = /[?&]v=([^?&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}