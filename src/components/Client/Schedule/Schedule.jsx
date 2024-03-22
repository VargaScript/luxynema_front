import { useEffect, useState } from "react";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import "./Schedule.css";
import { useSearchParams } from "react-router-dom";
import { firestore } from "../../utils/firebase.js";
import { Link } from "react-router-dom";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  writeBatch,
} from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";

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
  const [selectedSeats, setSelectedSeats] = useState([]); // Estado para los asientos seleccionados
  const [parentDocumentId, setParentDocumentId] = useState(null); // Agregamos estado para el ID del documento padre

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
        const querySnapshot = await getDocs(collection(db, "asientos"));
        const asientosData = [];

        if (!querySnapshot.empty) {
          const primerDocumento = querySnapshot.docs[0];
          const parentDocRef = primerDocumento.ref;
          const parentDocId = primerDocumento.id;

          // Guardamos el ID del documento padre en el estado
          setParentDocumentId(parentDocId);

          const subcoleccionId = "Sala1";
          const subcoleccionRef = collection(parentDocRef, subcoleccionId);
          const subcoleccionesSnapshot = await getDocs(subcoleccionRef);

          subcoleccionesSnapshot.forEach((subdoc) => {
            const estado = subdoc.data().estado;
            const id = subdoc.id;

            // Construir la ruta completa con el ID adicional
            const fullPath = `asientos/${parentDocId}/Sala1/${id}`;

            // Agregar los datos al arreglo asientosData
            asientosData.push({
              id: fullPath, // Aquí utilizamos el fullPath
              estado: estado,
              ...subdoc.data(),
            });
          });
        }

        // Guardar los datos en el estado asientos
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
      const docRef = doc(db, "peliculas", movie_id);
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


  const handleSeatClick = (seatId) => {
    console.log('Clicked seat id:', seatId);
    
    const updatedSeats = [...selectedSeats];
    const index = updatedSeats.indexOf(seatId);
  
    // Si el asiento no está en la lista de asientos seleccionados, añadirlo
    if (index === -1) {
      updatedSeats.push(seatId);
      console.log('Seat added:', seatId);
    } else { // Si el asiento está en la lista de asientos seleccionados, quitarlo
      updatedSeats.splice(index, 1);
      console.log('Seat removed:', seatId);
    }
  
    setSelectedSeats(updatedSeats); // Actualizar el estado de los asientos seleccionados
  
    // Actualizar el estado de los asientos en el estado 'asientos'
    const updatedAsientos = asientos.map((asiento) => {
      if (asiento.id === seatId) {
        return {
          ...asiento,
          estado: updatedSeats.includes(asiento.id) ? "seleccionado" : "disponible",
        };
      }
      return asiento;
    });
  
    console.log('Updated asientos:', updatedAsientos);
    
    setAsientos(updatedAsientos); // Actualizar el estado de los asientos
  }; 
  


                // const handleSeatClick = (seatId) => {
                //   const updatedSeats = [...selectedSeats];
                //   const index = updatedSeats.indexOf(seatId);

                //   // Si el asiento no está en la lista de asientos seleccionados, añadirlo
                //   if (index === -1) {
                //     updatedSeats.push(seatId);
                //   } else { // Si el asiento está en la lista de asientos seleccionados, quitarlo
                //     updatedSeats.splice(index, 1);
                //   }

                //   setSelectedSeats(updatedSeats); // Actualizar el estado de los asientos seleccionados

                //   // Actualizar el estado de los asientos en el estado 'asientos'
                //   const updatedAsientos = asientos.map((asiento) => {
                //     if (asiento.id === seatId) {
                //       return {
                //         ...asiento,
                //         estado: updatedSeats.includes(seatId) ? "seleccionado" : "disponible",
                //       };
                //     }
                //     return asiento;
                //   });

                //   setAsientos(updatedAsientos); // Actualizar el estado de los asientos
                // };

  const handleSend = async () => {
    if (selectedSeats.length > 0 && parentDocumentId) { // Verificamos si hay asientos seleccionados y si tenemos un ID de documento padre
      try {
        const batch = writeBatch(db);
        const idS = parentDocumentId;

        selectedSeats.forEach((seatId) => {
          const seatRef = doc(db, "asientos", idS, "Sala1", seatId);
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
          <section className="flex justify-center    md:p-0  bg-white sm:mx-40 md:mx-40 xl:mx-40 mx-2  rounded-xl mt-40">
            <div className=" flex   p-0 justify-center flex-wrap">
              <div className="justify-between align-center ">
                <img
                  className=" mt-20 sm:w-56 md:w-64 xl:w-72 w-44 "
                  src={movieDetails?.img_url}
                  alt={movieDetails?.titulo}

                />
                <h2 className="uppercase text-xl md:text-2xl font-medium lemon-milk text-center md:text-left sm:text-center mt-5">
                  {movieDetails?.titulo}
                </h2>
                
              </div>
              <div className=" contenido  mt-6 m-10">
                <h2
                  id="horarios"
                  className="uppercase text-2xl font-medium lemon-milk"
                >
                  Horarios
                </h2>
                <a
                  id="btn"
                  className="bg-[color:var(--azul)] text-black rounded-xl px-4 py-1 uppercase text-sm lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-1000"
                  href=""
                >
                  {movieDetails?.horario}
                </a>

                <hr className="bg-[color:var(--negro)] w-100 h-1 m-4"></hr>
                <div className="flex flex-wrap">
                  <div className="body p-6">
                    <h1>Select your places</h1>
                    <div className="movie-container">
                      <label>Movie </label>
                      <select
                        id="movie"
                        onChange={handleMovieChange}
                        value={ticketPrice}
                      >
                        {movieDetails && (
                          <select
                            id="movie"
                            onChange={handleMovieChange}
                            value={ticketPrice}
                          >
                            <option value={ticketPrice}>
                              {movieDetails?.titulo}- ${ticketPrice}
                            </option>
                          </select>
                        )}
                      </select>
                    </div>

                    <ul className="showcase">
                      <li>
                        <div className="seat"></div>
                        <small>N/A</small>
                      </li>
                      <li>
                        <div className="seat selected"></div>
                        <small>Selected</small>
                      </li>
                      <li>
                        <div className="seat occupied"></div>
                        <small>Occupied</small>
                      </li>
                    </ul>


                    <div className="container">
                      <div className="screen"></div>
                      <div className="row">
                        {asientos.map((asiento) => (
                          <div
                            className={
                              asiento.estado === "ocupado"
                                ? "seat occupied"
                                : asiento.selected
                                  ? "seat selected"
                                  : "seat"
                            }
                            key={asiento.id}
                            data-seat-id={asiento.id} // Añade el atributo data-seat-id
                            onClick={() => handleSeatClick(asiento.id)} // Pasa la clase CSS del asiento como parámetro
                          ></div>
                        ))}
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>

                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat occupied"></div>
                        <div className="seat occupied"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>

                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat occupied"></div>
                        <div className="seat occupied"></div>
                      </div>

                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>

                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat occupied"></div>
                        <div className="seat occupied"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                      </div>

                      <div className="row">
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat"></div>
                        <div className="seat occupied"></div>
                        <div className="seat occupied"></div>
                        <div className="seat occupied"></div>
                        <div className="seat"></div>
                      </div>
                    </div>
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
                                <p>{movieDetails?.horario}</p>
                                <p>{count}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="m-4 text-white">
                      <p>{movieDetails?.titulo}</p>
                      <p>{movieDetails?.duracion} minutos</p>
                      <Link to="/payment"
                        className="bg-[color:var(--negro)] text-white rounded-xl px-4 py-1 uppercase text-sm lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-1000"
                        onClick={handleSend}
                      >
                        Agregar boletos
                      </Link>
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
