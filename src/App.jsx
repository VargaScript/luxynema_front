
import { Route, Routes } from 'react-router-dom';
import { Root } from './components/Root/Root';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
// import { Payment } from './components/Payment/Payment';
// import { Schedule } from './components/Schedule/Schedule';
// import { AboutUs } from './components/AboutUs/AboutUs';

// import { AllMovies } from './components/AllMovies/AllMovies';
// import { Account } from './components/Account/Account';
// import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { Home } from './components/Client/Home/Home';
import { AboutUs } from './components/Client/AboutUs/AboutUs';
import { AllMovies } from './components/Client/AllMovies/AllMovies';
import { Schedule } from './components/Client/Schedule/Schedule';
import { Payment } from './components/Client/Payment/Payment';
import { Account } from './components/Client/Account/Account';
import Membership from './components/Client/Membership/Membership';
import { Route, Routes } from "react-router-dom";
import { Root } from "./components/Root/Root";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Client/Home/Home";
import { AboutUs } from "./components/Client/AboutUs/AboutUs";
import { AllMovies } from "./components/Client/AllMovies/AllMovies";
import { Schedule } from "./components/Client/Schedule/Schedule";
import { Payment } from "./components/Client/Payment/Payment";
import { Membership } from "./components/Client/Membership/Membership";
import { Account } from "./components/Client/Account/Account";
import { HomeA } from "./components/Admin/HomeA/HomeA";
import { AddMovies } from "./components/Admin/AddMovies/AddMovies";
import { AddUser } from "./components/Admin/AddUser/AddUser";
import { ListMovies } from "./components/Admin/ListMovies/ListMovies";
import { ListUsers } from "./components/Admin/ListUsers/ListUsers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> 
      {/* <Route path="/schedule" element={<Schedule />} /> */}
      {/* <Route path="/about-us" element={<AboutUs />} /> */}
      <Route path="/membership" element={<Membership />} /> 
      {/* <Route path="/all-movies" element={<AllMovies />} /> */}
      {/* <Route path="/account" element={<Account />} /> */}
      {/* <Route path="/payment" element={<Payment />} /> */}
      {/* <Route path="/error" element={<ErrorPage />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/all-movies" element={<AllMovies />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/account" element={<Account />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/home-a" element={<HomeA />} />
      <Route path="/add-movies" element={<AddMovies />} />
      <Route path="/add-users" element={<AddUser />}></Route>
      <Route path="/list-movies" element={<ListMovies />} />
      <Route path="/list-users" element={<ListUsers />}></Route>
    </Routes>
  );
};

export default App;
