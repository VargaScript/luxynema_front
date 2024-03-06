import { React, useEffect, useState } from "react";
import "./Movies.css";
import { Navbar } from "../Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import { db } from "../../credentials";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { doc, getDocFromCache } from "firebase/firestore";



export const Movies = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(70);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [hour] = useState("12:00PM");
  const seats = document.querySelectorAll(".row .seat:not(.occupied)");
  const [searchParams] = useSearchParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const getMovieData = async(movie_id)=>{
    const docRef = doc(db, "peliculas", movie_id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    const infoMovie = docSnap.data()
    setMovieDetails(infoMovie);
  }

    useEffect(()=>{
      getMovieData(selectedMovieIndex.toString()); //be aware here 
    },[selectedMovieIndex]);
  
   
  useEffect(() => {
    populateUI();
    setSelectedMovieIndex(searchParams.get("id")||0);

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

  const handleSeatClick = (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      // This part needs to be modified based on your React component structure.
      // You might use state to manage seat selections instead of manipulating the DOM directly.
      e.target.classList.toggle("selected");

      updateSelectedCount();
    }
  };

  
 const movies = [
   { name: "Arrival", price: 70, hour: "12pm" },

    
 ];

  const alertButton = () => {
    
    alert(
      "Nos encontramos en mantenimiento!, esta accion esta disponible PROXIMAMENTE!"
    );
  };

  return (
    <>
    <Navbar />
      <div>
        <section className="flex justify-center    md:p-0  bg-white sm:mx-40 md:mx-40 xl:mx-40 mx-2  rounded-xl mt-40">
          <div className=" flex   p-0 justify-center flex-wrap">
            <div className="justify-between align-center ">
              <img
                className=" mt-20 sm:w-56 md:w-64 xl:w-72 w-44 "
                src={movieDetails?.img_url}
                alt={movieDetails?.titulo}

              />
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
                  <h1>asientos</h1>
                  <div className="movie-container">
                    <label>Pick a movie:</label>
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

                  <div className="container" onClick={handleSeatClick}>
                    <div className="screen"></div>
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

                <div className="contenidoCheckOut  h-fit  bg-gray-300 rounded-xl mt-4">
                  <div className="innerCheckOut  flex ">
                    <img
                      className="moviePictureCheckOut w-40 p-2"
                      src={movieDetails?.img_url}
                    />
                    <div className="box ">
                      <h3 className="uppercase text-2xl font-medium  lemon-milk mt-20">
                        CheckOut
                      </h3>
                      <p>total: ${total}</p>
                      <p>hora: {movieDetails?.horario}</p>
                      <p>asientos: {count}</p>
                    </div>
                  </div>
                  <div className="m-4">
                    <p>{movieDetails?.titulo}</p>
                    <p>{movieDetails?.duracion} minutos</p>
                    <a
                      className="bg-[color:var(--negro)] text-white rounded-xl px-4 py-1 uppercase text-sm lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-1000"
                      onClick={alertButton}
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
