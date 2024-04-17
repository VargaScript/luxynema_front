import React, { useEffect, useState } from 'react';

export const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(10);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    populateUI();
  }, []);

  useEffect(() => {
    updateSelectedCount();
  }, [selectedSeats, ticketPrice]);

  const setMovieData = (movieIndex, moviePrice) => {
    setSelectedMovieIndex(movieIndex);
    setTicketPrice(moviePrice);
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
  };

  const handleMovieChange = (e) => {
    const movieIndex = e.target.selectedIndex;
    const moviePrice = parseFloat(e.target.value);
    setMovieData(movieIndex, moviePrice);
  };

  const handleSeatClick = (seatIndex) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter((index) => index !== seatIndex));
    } else {
      setSelectedSeats([...selectedSeats, seatIndex]);
    }
  };

  const populateUI = () => {
    const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const storedSelectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const storedSelectedMoviePrice = parseFloat(localStorage.getItem('selectedMoviePrice'));

    if (storedSelectedSeats !== null && storedSelectedSeats.length > 0) {
      setSelectedSeats(storedSelectedSeats);
    }

    if (storedSelectedMovieIndex !== null) {
      setSelectedMovieIndex(parseInt(storedSelectedMovieIndex));
    }

    if (storedSelectedMoviePrice !== null) {
      setTicketPrice(storedSelectedMoviePrice);
    }
  };

  const updateSelectedCount = () => {
    const selectedSeatsCount = selectedSeats.length;
    setCount(selectedSeatsCount);
    setTotal(selectedSeatsCount * ticketPrice);
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  };

  // Renderizando los asientos
  const renderSeats = () => {
    const rows = 10;
    const cols = 10;
    const seats = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const seatIndex = row * cols + col;
        const isOccupied = () => {
          // Aquí puedes tener tu lógica para determinar si un asiento está ocupado
          // Por ahora, asumiremos que todos los asientos están disponibles
          return false;
        };
        const isSelected = selectedSeats.includes(seatIndex);

        seats.push(
          <div
            key={seatIndex}
            className={`seat ${isOccupied() ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatIndex)}
          />
        );
      }
    }

    return seats;
  };

  return (
    <div>
      {/* <select id="movie" onChange={handleMovieChange} value={ticketPrice}>
        <option value={10}>Movie 1 - $10</option>
        <option value={15}>Movie 2 - $15</option>
        //////// Agrega más opciones de películas si es necesario 
      </select> */}

      <div className="container">
        {/* Renderizando los asientos */}
        
        {/* {renderSeats()} */}
      </div>
      {/* <p>Selected Seats: {count}</p>
      <p>Total: ${total}</p> */}
    </div>
  );
};
