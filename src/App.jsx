import { Route, Routes } from 'react-router-dom';
import { Root } from './components/Root/Root';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
// import { Payment } from './components/Payment/Payment';
// import { Schedule } from './components/Schedule/Schedule';
// import { AboutUs } from './components/AboutUs/AboutUs';
// import { Membership } from './components/Membership/Membership';
// import { AllMovies } from './components/AllMovies/AllMovies';
// import { Account } from './components/Account/Account';
// import { ErrorPage } from './components/ErrorPage/ErrorPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> 
      {/* <Route path="/schedule" element={<Schedule />} /> */}
      {/* <Route path="/about-us" element={<AboutUs />} /> */}
      {/* <Route path="/membership" element={<Membership />} /> */}
      {/* <Route path="/all-movies" element={<AllMovies />} /> */}
      {/* <Route path="/account" element={<Account />} /> */}
      {/* <Route path="/payment" element={<Payment />} /> */}
      {/* <Route path="/error" element={<ErrorPage />} /> */}
    </Routes>
  );
};

export default App;
