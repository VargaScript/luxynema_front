import { useState, useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import {
  Button,
  Input,
  Typography,
  Spinner,
  Card,
} from "@material-tailwind/react";
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

export const ListUsers = () => {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: "",
    userName: "",
    email: "",
    isSuperuser: false,
  });

  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const asyncLoader = async () => {
      setLoader(true);

      await new Promise((resolve) => setTimeout(resolve, 750));

      setLoader(false);
    };

    asyncLoader();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(usersCollection);
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        toast.error("Error fecthing users");
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditedUser(user);
    setEditMode(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    const newValue = type === "checkbox" ? event.target.checked : value;
    setEditedUser({ ...editedUser, [name]: newValue });
  };

  const handleSaveChanges = async () => {
    try {
      const userRef = doc(firestore, "users", editedUser.id);
      await updateDoc(userRef, editedUser);
      setEditMode(false);
      setEditedUser({
        id: "",
        userName: "",
        email: "",
        isSuperuser: false,
      });
      toast.success("Changes saved successfully.");
    } catch (error) {
      toast.error("Error saving changes.");
    }
  };

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleDeleteClick(user);
    }
  };

  const handleDeleteClick = async (user) => {
    try {
      const userRef = doc(firestore, "users", user.id);
      await deleteDoc(userRef);
      setUsers(users.filter((u) => u.id !== user.id));
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error("Error deleting user.");
    }
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
          <div className="background-background">

          
          <Sidebar className="z-50" />

          <section className="bg-white mx-10 md:mx-10 rounded-lg mt-4 md:mt-10 z-0 above-all">
            <div className="px-4 md:px-20 py-4 md:py-10">
              <h2 className="uppercase text-xl text-black md:text-2xl font-medium lemon-milk text-center md:text-left sm:text-center">
                All Users
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 gap-y-10 mt-4 md:mt-5">
                {users.map((user) => (
                  <Card
                    key={user.id}
                    className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-md gap-x-5 width-[200px] h-[250px] flex items-center"
                  >
                    {editMode && editedUser.id === user.id ? (
                      <div className="flex flex-col gap-5 width-[200px]">
                        <Input
                          className=""
                          type="text"
                          name="userName"
                          value={editedUser.userName}
                          onChange={handleInputChange}
                          placeholder="Username"
                        />
                        <Input
                          className=""
                          type="text"
                          name="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                        />
                        <label className="mb-2">
                          <input
                            type="checkbox"
                            name="isSuperuser"
                            checked={editedUser.isSuperuser}
                            onChange={handleInputChange}
                          />{" "}
                          Is Superuser
                        </label>
                        <Button
                          className="-mt-3 -[200px] bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                          onClick={handleSaveChanges}
                        >
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-between items-center">
                        <Typography
                          variant="h6"
                          color="gray"
                          className="w-[200px] break-all"
                        >
                          Username: {user.userName}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="gray"
                          className="w-[200px] break-all"
                        >
                          Email: {user.email}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="gray"
                          className="w-[200px] break-all"
                        >
                          Is Superuser: {user.isSuperuser ? "Yes" : "No"}
                        </Typography>
                        <div className="flex gap-4 mt-4 justify-end">
                          <Button
                            className="bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                            onClick={() => handleEditClick(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="bg-[color:var(--azul-fuerte)] text-white hover:bg-[color:var(--azul-claro)] hover:text-[color:var(--azul-fuerte)] duration-300"
                            onClick={() => confirmDeleteUser(user)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </ul>
            </div>
          </section>
          <div className="pb-20" />
        </div>
      </div>
      </div>
    </>
  );
};
