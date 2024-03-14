// App.js
import { Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Payment } from './components/Payment/Payment';
import { STRIPE_PUBLIC_KEY } from './utils/stripe.js';
import { Root } from './components/Root/Root';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import { Schedule } from './components/Schedule/Schedule';
import { AboutUs } from './components/AboutUs/AboutUs';
import { Membership } from './components/Membership/Membership';
import { AllMovies } from './components/AllMovies/AllMovies';
import { Account } from './components/Account/Account';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/all-movies" element={<AllMovies />} />
      <Route path="/account" element={<Account />} />
      <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
