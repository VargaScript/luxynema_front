import { useState, useEffect } from "react";
import "./AddUser.css";
import { Sidebar } from "../Sidebar/Sidebar";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Input,
  Typography,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { firestore } from "../../../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddUser = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSuperuser: false,
  });

  const { userName, email, password, confirmPassword, isSuperuser } = user;

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoader(false);
    };

    asyncLoader();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return regex.test(password);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const values = [userName, email, password, confirmPassword];

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        toast.error(
          "Enter a password with at least 8 characters, a number, an uppercase letter and a special character."
        );
        return;
      }

      try {
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(usersCollection);
        const existingUsers = querySnapshot.docs.map((doc) => doc.data().email);

        if (existingUsers.includes(email)) {
          toast.error("This user already exists.");
        } else {
          const userData = {
            id: uuidv4(),
            userName,
            email,
            password,
            isSuperuser,
          };

          await addDoc(usersCollection, userData);

          toast.success("User added successfully.");
          setUser({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isSuperuser: false,
          });
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      toast.error("Please, fill all the fields.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setUser({ ...user, [name]: newValue });
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
                Enter user data
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
                      name="userName"
                      value={userName}
                      onChange={handleInputChange}
                      color="white"
                      label="Username"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="email"
                      size="lg"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      color="white"
                      label="Email"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="password"
                      size="lg"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      color="white"
                      label="Password"
                    />
                  </div>
                  <div className="form-control">
                    <Input
                      variant="outlined"
                      type="password"
                      size="lg"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      color="white"
                      label="Confirm Password"
                    />
                  </div>
                  <div className="form-control sm:col-span-2">
                    <Checkbox
                      color="blue-gray"
                      checked={isSuperuser}
                      onChange={handleInputChange}
                      name="isSuperuser"
                      label="Superuser"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center">
                  <Button
                    type="submit"
                    className="px-32 bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                  >
                    Add User
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
