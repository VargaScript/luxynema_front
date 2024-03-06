import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Root } from "./components/Root/Root";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import { Movies } from "./components/Movies/Movies";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { Membership } from "./components/Membership/Membership";
import { Account } from "./components/Account/Account";
import Loader from "./components/Loader/Loader";
// import { Navbar } from "./components/Navbar/Navbar";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fakeAsyncLoad = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setLoader(false);
    };

    void fakeAsyncLoad();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Root />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/about-us" element={<AboutUs />}></Route>
            <Route path="/membership" element={<Membership />}></Route>
            <Route path="/account" element={<Account />}></Route>
          </Routes>
        </>
      )}
    </>
  );
}
export default App;
