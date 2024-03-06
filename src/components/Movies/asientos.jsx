

// SeatBooking.js (o cualquier otro nombre que desees)
import React, { useEffect, useState } from 'react';

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(10);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    populateUI();
  }, []);

  const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
  };

  const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    setCount(selectedSeatsCount);
    setTotal(selectedSeatsCount * ticketPrice);
  };

  const populateUI = () => {
    const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (storedSelectedSeats !== null && storedSelectedSeats.length > 0) {
      // This part needs to be modified based on your React component structure.
      // You might use state to manage seat selections instead of manipulating the DOM directly.
    }

    const storedSelectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (storedSelectedMovieIndex !== null) {
      // This part needs to be modified based on your React component structure.
      // You might use state to manage movie selection instead of manipulating the DOM directly.
    }
  };

  const handleMovieChange = (e) => {
    setTicketPrice(+e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  };

  const handleSeatClick = (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      // This part needs to be modified based on your React component structure.
      // You might use state to manage seat selections instead of manipulating the DOM directly.
    }
  };

  // Assuming you have a list of movies with their prices
  const movies = [
    { name: 'Movie 1', price: 10 },
    { name: 'Movie 2', price: 15 },
    // Add more movies as needed
  ];

  return (
    <div>
      <select id="movie" onChange={handleMovieChange} value={ticketPrice}>
        {movies.map((movie, index) => (
          <option key={index} value={movie.price}>
            {movie.name} - ${movie.price}
          </option>
        ))}
      </select>

      {/* Render your seats using JSX */}
      <div className="container" onClick={handleSeatClick}>
        {/* Your seat JSX goes here */}
      </div>

      <p>Selected Seats: {count}</p>
      <p>Total: ${total}</p>
    </div>
  );
};

export default SeatBooking;
