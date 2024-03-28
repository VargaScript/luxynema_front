import { Route, Routes } from 'react-router-dom';
import { Root } from './components/Root/Root';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Home } from './components/Client/Home/Home';
import { AboutUs } from './components/Client/AboutUs/AboutUs';
import { AllMovies } from './components/Client/AllMovies/AllMovies';
import { Schedule } from './components/Client/Schedule/Schedule';
import { Payment } from './components/Client/Payment/Payment';
import { Membership } from './components/Client/Membership/Membership';
import { Account } from './components/Client/Account/Account';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/all-movies" element={<AllMovies />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/account" element={<Account />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default App;
