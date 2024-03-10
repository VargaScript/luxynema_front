import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Root } from "./components/Root/Root";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import { Schedule } from "./components/Schedule/Schedule"
import { AboutUs } from "./components/AboutUs/AboutUs";
import { Membership } from "./components/Membership/Membership";
import { AllMovies } from "./components/AllMovies/AllMovies";
import { Account } from "./components/Account/Account";
import { Payment } from "./components/Payment/Payment";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/schedule" element={<Schedule />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/membership" element={<Membership />}></Route>
        <Route path="/all-movies" element={<AllMovies />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}
export default App;
