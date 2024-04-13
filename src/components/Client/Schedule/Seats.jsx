
import React, { useEffect, useState } from 'react';

export const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(10);

  useEffect(() => {
    populateUI();
  }, []);

  const handleMovieChange = (e) => {
    setTicketPrice(+e.target.value);
    setMovieData(e.target.selectedIndex, +e.target.value);
    updateSelectedCount();
  };

  const handleSeatClick = (e) => {
    if (!e.target.classList.contains("occupied")) {
      e.target.classList.toggle("selected");
      updateSelectedCount();
    }
  };

  const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
  };

  const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = Array.from(selectedSeats).map(seat => seat.parentNode.cellIndex);
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    document.getElementById("count").innerText = selectedSeatsCount;
    document.getElementById("total").innerText = selectedSeatsCount * ticketPrice;
  };

  const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
      const rows = document.querySelectorAll('.row');
      rows.forEach((row, rowIndex) => {
        const seats = row.querySelectorAll('.seat');
        seats.forEach((seat, seatIndex) => {
          if (selectedSeats.includes(seatIndex)) {
            seat.classList.add("selected");
          }
        });
      });
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
      document.getElementById("movie").selectedIndex = selectedMovieIndex;
    }
  };

  return (
    <div className="container">
      <div className="movie-container">
        
        <select id="movie" onChange={handleMovieChange} value={ticketPrice}>
          <option value="10"></option>
        </select>
      </div>
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="screen"></div>
      <div className="row" onClick={handleSeatClick}>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>

      <div className="row" onClick={handleSeatClick}>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      <div className="row" onClick={handleSeatClick}>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>
      <div className="row" onClick={handleSeatClick}>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
        <div className="seat"></div>
      </div>

      {/* Add other rows here */}
      <p className="text">
        You have selected <span id="count"> 0 </span> seats {/*for a price of $<span id="total">0</span>*/}
      </p>
      {/* <p>Selected Seats: {count}</p>
      <p>Total: ${total}</p> */}
    </div>
  );
};

export default SeatBooking;
