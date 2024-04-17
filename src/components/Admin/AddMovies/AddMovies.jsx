import { useState, useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Input,
  Typography,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { firestore } from "../../../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddMovies.css";

export const AddMovies = () => {
  const [loader, setLoader] = useState(true);
  const [movie, setMovie] = useState({
    duration: "",
    genre: "",
    schedule: "",
    img_url: "",
    img_url_hd: "",
    price: "",
    sinopsis: "",
    title: "",
    trailer: "",
  });

  const {
    duration,
    genre,
    schedule,
    img_url,
    img_url_hd,
    price,
    sinopsis,
    title,
    trailer,
  } = movie;

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoader(false);
    };

    asyncLoader();
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const values = [
      duration,
      genre,
      schedule,
      img_url,
      img_url_hd,
      price,
      sinopsis,
      title,
      trailer,
    ];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      try {
        const moviesCollection = collection(firestore, "movies");
        const querySnapshot = await getDocs(moviesCollection);
        const existingMovies = querySnapshot.docs.map(
          (doc) => doc.data().title
        );

        if (existingMovies.includes(title)) {
          toast.error("This movie already exists.");
        } else {
          const movieData = {
            id: uuidv4(),
            duration,
            genre,
            schedule,
            img_url,
            img_url_hd,
            price,
            sinopsis,
            title,
            trailer,
          };

          await addDoc(moviesCollection, movieData);
          toast.success("Movie added successfully.");
          setMovie({
            duration: "",
            genre: "",
            schedule: "",
            img_url: "",
            img_url_hd: "",
            price: "",
            sinopsis: "",
            title: "",
            trailer: "",
          });
        }
      } catch (error) {
        toast.error("Failed adding movie.");
      }
    } else {
      toast.error("Please fill all the fields.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  return (
    <>
      <ToastContainer />
      <div className="relative h-screen">
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
          <div className="background-background h-screen flex items-center justify-center z-0 -mt-[50px]">
            <div className="main-form text-white w-full sm:w-1/2">
              <Typography
                className="text-white text-center -mt-10"
                variant="h1"
              >
                Enter movie data
              </Typography>
              <form
                onSubmit={handleOnSubmit}
                className="mt-8 mb-2 max-w-screen-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="text"
                      size="lg"
                      name="title"
                      value={title}
                      onChange={handleInputChange}
                      color="white"
                      label="Title"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="text"
                      size="lg"
                      name="duration"
                      value={duration}
                      onChange={handleInputChange}
                      color="white"
                      label="Duration"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      label="Genres"
                      type="text"
                      size="lg"
                      name="genre"
                      value={genre}
                      onChange={handleInputChange}
                      color="white"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="text"
                      size="lg"
                      name="schedule"
                      value={schedule}
                      onChange={handleInputChange}
                      color="white"
                      label="Schedule (Separated by commas)"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="text"
                      size="lg"
                      name="img_url"
                      value={img_url}
                      onChange={handleInputChange}
                      color="white"
                      label="Image URL"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="text"
                      size="lg"
                      name="img_url_hd"
                      value={img_url_hd}
                      onChange={handleInputChange}
                      color="white"
                      label="HD Image URL"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="text"
                      size="lg"
                      name="price"
                      value={price}
                      onChange={handleInputChange}
                      color="white"
                      label="Price"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="text"
                      size="lg"
                      name="trailer"
                      value={trailer}
                      onChange={handleInputChange}
                      color="white"
                      label="Trailer URL"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="form-control col-span-2 !text-white !border-white">
                    <Textarea
                      color="blue-gray"
                      className=""
                      name="sinopsis"
                      value={sinopsis}
                      onChange={handleInputChange}
                      label="Sinopsis"
                    />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    className="px-32 bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                  >
                    Add Movie
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
