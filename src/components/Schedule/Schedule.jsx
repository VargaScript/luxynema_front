import { React, useEffect, useState } from "react";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import "./Schedule.css";

import { useSearchParams } from "react-router-dom";
import { db } from "../../credentials";
import {
  collection,
  getDoc,
  getDocs,
  query,
  doc,
  updateDoc,
  writeBatch, // Importa writeBatch
} from "firebase/firestore";



export const Schedule = () => {

  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(70);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [hour] = useState("12:00PM");

  const [searchParams] = useSearchParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [asientos, setAsientos] = useState([]);
  const [parentDocumentId, setParentDocumentId] = useState(null);
  const [parentDocumentId2, setParentDocumentId2] = useState(null);
  const seats = document.querySelectorAll(".row .seat:not(.occupied)");

  const getMovieData = async (movie_id) => {
    const docRef = doc(db, "peliculas", movie_id);
    const docSnap = await getDoc(docRef);
    const infoMovie = docSnap.data();
    setMovieDetails(infoMovie);
  };

  useEffect(() => {
    const fetchAsientos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "asientos"));
        const asientosData = [];

        if (!querySnapshot.empty) {
          const primerDocumento = querySnapshot.docs[0];
          const parentDocRef = primerDocumento.ref;
          const parentDocId = primerDocumento.id;

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
    getMovieData(selectedMovieIndex.toString()); //be aware here
  }, [selectedMovieIndex]);


  useEffect(() => {
    populateUI();
    setSelectedMovieIndex(searchParams.get("id") || 0);
  }, []);


  const setMovieData = (movieIndex, moviePrice, movieHour) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
    localStorage.setItem("selectedMovieHour", movieHour);
  };
  const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map((seat) =>
      [...seats].indexOf(seat)
    );
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    setCount(selectedSeatsCount);
    setTotal(selectedSeatsCount * ticketPrice);
  };

  const populateUI = () => {
    const storedSelectedSeats = JSON.parse(
      localStorage.getItem("selectedSeats")
    );

    if (storedSelectedSeats !== null && storedSelectedSeats.length > 0) {
      // This part needs to be modified based on your React component structure.
      // You might use state to manage seat selections instead of manipulating the DOM directly.
    }

    const storedSelectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (storedSelectedMovieIndex !== null) {
      // This part needs to be modified based on your React component structure.
      // You might use state to manage movie selection instead of manipulating the DOM directly.
    }
  };

  const handleMovieChange = (e) => {
    setTicketPrice(+e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
  };

  const handleSeatClick = (seatId) => {
    const selectedSeatIndex = asientos.findIndex(
      (asiento) => asiento.id === seatId
    );
    const updatedAsientos = [...asientos];
    // Si el asiento está seleccionado, lo deselecciona; de lo contrario, lo selecciona
    updatedAsientos[selectedSeatIndex].selected =
      !updatedAsientos[selectedSeatIndex].selected;
    setAsientos(updatedAsientos);
    const selectedSeats = updatedAsientos.filter((asiento) => asiento.selected);
    const selectedSeatIds = selectedSeats.map((asiento) => asiento.id);
    console.log("Asientos seleccionados:", selectedSeatIds);
    updateSelectedCount();
  };
  const movies = [{ name: "Arrival", price: 70, hour: "12pm" }];

  const handleSend = async () => {
    // Verifica si hay asientos seleccionados
    const selectedSeats = asientos.filter((seat) => seat.selected);

    if (selectedSeats.length > 0) {
      try {
        const batch = writeBatch(db);
        const idS = parentDocumentId; // Utilizar el ID superior

        // Actualiza el estado de los asientos seleccionados en la base de datos
        selectedSeats.forEach((seat) => {
          const seatRef = doc(db, "asientos", idS, "Sala1", seat.id);
          batch.update(seatRef, { estado: "ocupado" });
        });

        // Ejecuta la transacción en lote
        await batch.commit();

        alert("Asientos agregados correctamente.");
      } catch (error) {
        console.error("Error al actualizar los asientos: ", error);
        alert(
          "Hubo un error al agregar los asientos. Por favor, inténtalo de nuevo."
        );
      }
    } else {
      alert("No hay asientos seleccionados para agregar.");
    }
  }





  return (
    <>
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
                      {movies.map((movie, index) => (
                        <option key={index} value={movie.price}>
                          {movieDetails?.titulo}- ${movie.price}
                        </option>
                      ))}
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
                    <a
                      className="bg-[color:var(--negro)] text-white rounded-xl px-4 py-1 uppercase text-sm lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-1000"
                      onClick={handleSend}
                    >
                      Agregar boletos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
