import { useState, useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Button, Input, Typography, Spinner } from "@material-tailwind/react";
import { firestore } from "../../../utils/firebase";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ListMovies = () => {
  const [loader, setLoader] = useState(true);
  const [movies, setMovies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [editedMovie, setEditedMovie] = useState({
    id: "",
    duration: "",
    genre: "",
    img_url: "",
    img_url_hd: "",
    price: "",
    schedule: "",
    sinopsis: "",
    title: "",
    trailer: "",
  });

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);

      await new Promise((resolve) => setTimeout(resolve, 750));

      setLoader(false);
    };

    asyncLoader();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(firestore, "movies");
        const querySnapshot = await getDocs(moviesCollection);
        const movieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleEditClick = (movie) => {
    setEditedMovie(movie);
    setEditMode(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const movieRef = doc(firestore, "movies", editedMovie.id);
      await updateDoc(movieRef, editedMovie);
      setEditMode(false);
      setEditedMovie({
        id: "",
        duration: "",
        genre: "",
        img_url: "",
        img_url_hd: "",
        price: "",
        schedule: "",
        sinopsis: "",
        title: "",
        trailer: "",
      });
      toast.success("Changes saved successfully.");
    } catch (error) {
      toast.error("Error saving changes.");
    }
  };

  const confirmDeleteMovie = (movie) => {
    setMovieToDelete(movie);
    if (window.confirm("Are you sure you want to delete this movie?")) {
      handleDeleteClick(movie);
    }
  };

  const handleDeleteClick = async (movie) => {
    try {
      const movieRef = doc(firestore, "movies", movie.id);
      await deleteDoc(movieRef);
      setMovies(movies.filter((m) => m.id !== movie.id));
      toast.success("Movie deleted successfully.");
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Error deleting movie.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative h-screen background-background">
        {loader && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner className="h-12 w-12 mb-4" color="indigo" />
          </div>
        )}
        <div
          className={`${
            loader ? "opacity-0" : "opacity-100"
          } transition-opacity duration-700`}
        >
          <Sidebar className="z-50" />
          <section className="bg-white mx-14 rounded-lg mt-4 md:mt-10 z-0 above-all">
            <div className="md:px-20 py-4 md:py-10 -mr-10">
              <h2 className="uppercase text-black text-xl md:text-2xl font-medium lemon-milk text-center md:text-left sm:text-center">
                All Movies
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 gap-y-10 mt-4 md:mt-5">
                {movies.map((movie) => (
                  <li key={movie.id} className="gap-x-5 w-[250px]">
                    {editMode && editedMovie.id === movie.id ? (
                      <div className="flex flex-col gap-5 w-[250px]">
                        <Input
                          className=""
                          type="text"
                          name="title"
                          value={editedMovie.title}
                          onChange={handleInputChange}
                          placeholder="Title"
                        />
                        <Input
                          className="mb-2"
                          type="text"
                          name="duration"
                          value={editedMovie.duration}
                          onChange={handleInputChange}
                          placeholder="Duration"
                        />
                        <Input
                          className="mb-2"
                          type="text"
                          name="genre"
                          value={editedMovie.genre}
                          onChange={handleInputChange}
                          placeholder="Genre"
                        />
                        <Input
                          className="mb-10"
                          type="text"
                          name="img_url"
                          value={editedMovie.img_url}
                          onChange={handleInputChange}
                          placeholder="Image URL"
                        />
                        <Input
                          className="mb-4"
                          type="text"
                          name="schedule"
                          value={editedMovie.schedule}
                          onChange={handleInputChange}
                          placeholder="Schedule"
                        />
                        <Input
                          className="mb-4"
                          type="text"
                          name="price"
                          value={editedMovie.price}
                          onChange={handleInputChange}
                          placeholder="Price"
                        />
                        <Button
                          className="mt-2 w-[250px] bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                          onClick={handleSaveChanges}
                        >
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="w-[250px]">
                        <img
                          className="w-[250px] h-[267px] object-cover mb-4"
                          src={movie.img_url}
                          alt={movie.title}
                        />
                        <Typography variant="h6" color="gray">
                          Title: {movie.title}
                        </Typography>
                        <Typography variant="h6" color="gray">
                          Duration: {movie.duration} min
                        </Typography>
                        <Typography variant="h6" color="gray">
                          Genre: {movie.genre}
                        </Typography>
                        <div className="flex gap-[86px] w-[250px] mt-2">
                          <Button
                            className="bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                            onClick={() => handleEditClick(movie)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                            onClick={() => confirmDeleteMovie(movie)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
