import { useEffect, useState } from "react";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import "./Schedule.css";
import { useSearchParams, Link } from "react-router-dom"; // Importa Link de react-router-dom
import { firestore } from "../../../utils/firebase";
import { getDoc, collection, getDocs, doc, writeBatch } from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";
import SeatBooking from './Seats'


export const Schedule = () => {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(70);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(true);
  const [shows, setShows] = useState(null)
  const [seats, setSeats] = useState(null)

  const [searchParams] = useSearchParams();
  const [movieDetails, setMovieDetails] = useState(null);


  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoader(false);
    };

    asyncLoader();
  }, []);

  const handleSetSeats=(show)=>{
    let seatsArray = []
    // console.log(infoMovie)
    Object.entries(show.seats).sort().forEach((row, i)=>{
      console.log(row)
      seatsArray[i] = row[1].map((seat)=>(seat?null:false));
    })

    setSeats(seatsArray)
  }

  useEffect(() => {
    const getMovieData = async (movie_id) => {
      const docRef = doc(firestore, "movies", movie_id);
      const docSnap = await getDoc(docRef);
      const infoMovie = docSnap.data();

      setShows(infoMovie.shows.map((show)=>(
        {
          ...show,
          dateTime: new Date(show.dateTime.nanoseconds/1000)
        }
      )))



      // handleSetSeats(seatsArray)
      // setMovieDetails(infoMovie);
      // const moviePrice = infoMovie.price;
      setTicketPrice(infoMovie.price);
      
      setMovieDetails(infoMovie);
    };

    getMovieData(selectedMovieIndex.toString());
  }, [selectedMovieIndex]);

  useEffect(() => {
    setSelectedMovieIndex(searchParams.get("id") || 0);
  }, []);














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
          <section className="flex justify-center md:p-0 bg-white sm:mx-40 md:mx-40 xl:mx-40  mx-2 rounded-xl mt-40">
            <div className="flex p-0 justify-center flex-wrap">
              <div className="justify-between align-center ">
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
                {
                  shows && shows.map((show, i)=>(
                  <p
                    key={i}
                    id="btn"
                    className="bg-[color:var(--azul)] inline cursor-pointer text-black rounded-xl px-4 py-1 uppercase text-sm lemon-milk hover:bg-white hover:text-[color:var(--negro)] transition-all duration-1000"
                    onClick={()=>{
                      console.log(show)
                      handleSetSeats(show)}}
                  >
                    {`${show.dateTime.getHours()}:${show.dateTime.getMinutes()}`}                  
                  </p>
                  ))
                }
                <hr className="bg-[color:var(--negro)] w-100 h-1 m-4"></hr>
                <div className="flex flex-wrap ">
                  <div className=" p-4">
                    <h1>Select your places</h1>
                    <h1>Ticket Price:$ {movieDetails?.price}</h1>

                  <SeatBooking onSeatClick={SeatBooking} seats={seats} setSeats={setSeats} totalSeats={count}/>

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
