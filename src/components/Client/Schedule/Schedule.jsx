import { useEffect, useState } from "react";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import "./Schedule.css";
import { useSearchParams, Link } from "react-router-dom"; // Importa Link de react-router-dom
import { firestore } from "../../../utils/firebase";
import { getDoc, collection, getDocs, doc, writeBatch } from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";
import Seats from './Seats'

export const Schedule = () => {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(70);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(true);

  const [searchParams] = useSearchParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [asientos, setAsientos] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [parentDocumentId, setParentDocumentId] = useState(null);

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoader(false);
    };

    asyncLoader();
  }, []);

  useEffect(() => {
    const fetchAsientos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "seats"));
        const asientosData = [];

        if (!querySnapshot.empty) {
          const primerDocumento = querySnapshot.docs[0];
          const parentDocRef = primerDocumento.ref;
          const parentDocId = primerDocumento.id;

          setParentDocumentId(parentDocId);

          const subcoleccionId = "Sala1";
          const subcoleccionRef = collection(parentDocRef, subcoleccionId);
          const subcoleccionesSnapshot = await getDocs(subcoleccionRef);

          subcoleccionesSnapshot.forEach((subdoc) => {
            const estado = subdoc.data().estado;
            const id = subdoc.id;

            const fullPath = `asientos/${parentDocId}/Sala1/${id}`;

            asientosData.push({
              id: fullPath,
              estado: estado,
              ...subdoc.data(),
            });
          });
        }

        setAsientos(asientosData);

        setLoading(false);          
      } catch (error) {
        console.error("Error obteniendo asientos: ", error);
        setLoading(false);
      }
    };

    fetchAsientos();
  }, []);

  useEffect(() => {
    const getMovieData = async (movie_id) => {
      const docRef = doc(firestore, "movies", movie_id);
      const docSnap = await getDoc(docRef);
      const infoMovie = docSnap.data();
      setMovieDetails(infoMovie);
    };

    getMovieData(selectedMovieIndex.toString());
  }, [selectedMovieIndex]);

  useEffect(() => {
    setSelectedMovieIndex(searchParams.get("id") || 0);
  }, []);


  const handleMovieChange = (e) => {
    setTicketPrice(+e.target.value);
    updateSelectedCount();
  };

  const updateSelectedCount = () => {
    const selectedSeatsCount = selectedSeats.length;
    setCount(selectedSeatsCount);
    setTotal(selectedSeatsCount * ticketPrice);
  };

  const handleSeatClick = (seatIndex) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter((index) => index !== seatIndex));
    } else {
      setSelectedSeats([...selectedSeats, seatIndex]);
    }
  }; 


  const handleSend = async () => {
    if (selectedSeats.length > 0 && parentDocumentId) {
      try {
        const batch = writeBatch(firestore);
        const idS = parentDocumentId;

        selectedSeats.forEach((seatId) => {
          const seatRef = doc(firestore, "asientos", idS, "Sala1", seatId);
          batch.update(seatRef, { estado: "ocupado" });
        });

        await batch.commit();

        alert("Asientos agregados correctamente.");
      } catch (error) {
        console.error("Error al actualizar los asientos: ", error);
        alert(
          "Hubo un error al agregar los asientos. Por favor, inténtalo de nuevo."
        );
      }
    } else {
      alert("No hay asientos seleccionados para agregar o no se ha cargado la información necesaria.");
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
        <div>
          <section className="flex justify-center md:p-0 bg-white sm:mx-40 md:mx-40 xl:mx-40 mx-2 rounded-xl mt-40">
            <div className="flex p-0 justify-center flex-wrap">
              <div className="justify-between align-center">
                <img
                  className="mt-20 sm:w-56 md:w-64 xl:w-72 w-44"
                  src={movieDetails?.img_url}
                  alt={movieDetails?.title}
                />
                <h2 className="uppercase text-xl md:text-2xl font-medium lemon-milk text-center md:text-left sm:text-center mt-5">
                  {movieDetails?.title}
                </h2>
              </div>
              <div className="contenido mt-6 m-10">
                <h2 id="horarios" className="uppercase text-2xl font-medium lemon-milk">
                  Horarios
                </h2>
                <a
                  id="btn"
                  className="bg-[color:var(--azul)] text-black rounded-xl px-4 py-1 uppercase text-sm lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-1000"
                  href=""
                >
                  {movieDetails?.schedule}
                  {movieDetails?.schedule }
                </a>
                <hr className="bg-[color:var(--negro)] w-100 h-1 m-4"></hr>
                <div className="flex flex-wrap">
                  <div className="body p-6">
                    <h1>Select your places</h1>
                  <Seats/>

                    


                  </div>

                  <div className="contenidoCheckOut bg-black rounded-xl mt-4 mx-4 md:w-auto flex flex-col items-center justify-center">
                    <div className="innerCheckOut mt-4 m-4 md:flex md:items-center">
                      <img
                        className="moviePictureCheckOut w-40 p-2"
                        src={movieDetails?.img_url}
                      />
                      <div className="box mt-4 md:mt-0 md:ml-4">
                        <h3 className="uppercase text-white text-2xl font-medium lemon-milk mt-4 md:mt-0">
                          CheckOut
                        </h3>
                        <div>
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <div>
                                <div>
                                  <p className="text-blue-300">Total:</p>
                                  <p className="text-blue-300">Hora:</p>
                                  <p className="text-blue-300">Asientos:</p>
                                </div>
                              </div>
                              <div className="text-white">
                                <p>${total}</p>
                                <div>{movieDetails?.schedule}</div>
                                <p>{count}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" text-white">
                    <div className="m-4 text-white">
                      <div>{movieDetails?.title}</div>
                      <div>{movieDetails?.duration} minutos</div>
                      {/* Cambiamos <a> por <Link> */}
                      <Link
                        
                        className="bg-[color:var(--negro)] text-white rounded-xl px-4 py-1 uppercase text-sm lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-1000"
                        onClick={handleSend}
                        // Pasamos los datos de la película seleccionada como parámetros en la URL
                        to={`/payment?id=${selectedMovieIndex}`}
                      >
                        Agregar boletos
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
