

// // SeatBooking.js (o cualquier otro nombre que desees)
// import React, { useEffect, useState } from 'react';

// const SeatBooking = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
//   const [ticketPrice, setTicketPrice] = useState(10);
//   const [count, setCount] = useState(0);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     populateUI();
//   }, []);

//   const setMovieData = (movieIndex, moviePrice) => {
//     localStorage.setItem('selectedMovieIndex', movieIndex);
//     localStorage.setItem('selectedMoviePrice', moviePrice);
//   };

//   const updateSelectedCount = () => {
//     const selectedSeats = document.querySelectorAll('.row .seat.selected');
//     const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
//     localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

//     const selectedSeatsCount = selectedSeats.length;
//     setCount(selectedSeatsCount);
//     setTotal(selectedSeatsCount * ticketPrice);
//   };

//   const populateUI = () => {
//     const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

//     if (storedSelectedSeats !== null && storedSelectedSeats.length > 0) {
//       // This part needs to be modified based on your React component structure.
//       // You might use state to manage seat selections instead of manipulating the DOM directly.
//     }

//     const storedSelectedMovieIndex = localStorage.getItem('selectedMovieIndex');

//     if (storedSelectedMovieIndex !== null) {
//       // This part needs to be modified based on your React component structure.
//       // You might use state to manage movie selection instead of manipulating the DOM directly.
//     }
//   };

//   const handleMovieChange = (e) => {
//     setTicketPrice(+e.target.value);
//     setMovieData(e.target.selectedIndex, e.target.value);
//     updateSelectedCount();
//   };

//   const handleSeatClick = (e) => {
//     if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
//       // This part needs to be modified based on your React component structure.
//       // You might use state to manage seat selections instead of manipulating the DOM directly.
//     }
//   };

//   // Assuming you have a list of movies with their prices
//   const movies = [
//     { name: 'Movie 1', price: 10 },
//     { name: 'Movie 2', price: 15 },
//     // Add more movies as needed
//   ];

//   return (
//     <div>
//       <select id="movie" onChange={handleMovieChange} value={ticketPrice}>
//         {movies.map((movie, index) => (
//           <option key={index} value={movie.price}>
//             {movie.name} - ${movie.price}
//           </option>
//         ))}
//       </select>

//       {/* Render your seats using JSX */}
//       <div className="container" onClick={handleSeatClick}>
//         {/* Your seat JSX goes here */}
//       </div>

//       <p>Selected Seats: {count}</p>
//       <p>Total: ${total}</p>
//     </div>
//   );
// };

// export default SeatBooking;


//segundo intento -------------------------------------------------


// import React, { useEffect, useState } from 'react';

// const SeatBooking = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
//   const [ticketPrice, setTicketPrice] = useState(10);
//   const [count, setCount] = useState(0);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     populateUI();
//   }, []);

//   useEffect(() => {
//     updateSelectedCount();
//   }, [selectedSeats, ticketPrice]);

//   const setMovieData = (movieIndex, moviePrice) => {
//     setSelectedMovieIndex(movieIndex);
//     setTicketPrice(moviePrice);
//     localStorage.setItem('selectedMovieIndex', movieIndex);
//     localStorage.setItem('selectedMoviePrice', moviePrice);
//   };

//   const handleMovieChange = (e) => {
//     const movieIndex = e.target.selectedIndex;
//     const moviePrice = parseFloat(e.target.value);
//     setMovieData(movieIndex, moviePrice);
//   };

//   const handleSeatClick = (seatIndex) => {
//     if (selectedSeats.includes(seatIndex)) {
//       setSelectedSeats(selectedSeats.filter((index) => index !== seatIndex));
//     } else {
//       setSelectedSeats([...selectedSeats, seatIndex]);
//     }
//   };

//   const populateUI = () => {
//     const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
//     const storedSelectedMovieIndex = localStorage.getItem('selectedMovieIndex');
//     const storedSelectedMoviePrice = parseFloat(localStorage.getItem('selectedMoviePrice'));

//     if (storedSelectedSeats !== null && storedSelectedSeats.length > 0) {
//       setSelectedSeats(storedSelectedSeats);
//     }

//     if (storedSelectedMovieIndex !== null) {
//       setSelectedMovieIndex(parseInt(storedSelectedMovieIndex));
//     }

//     if (storedSelectedMoviePrice !== null) {
//       setTicketPrice(storedSelectedMoviePrice);
//     }
//   };

//   const updateSelectedCount = () => {
//     const selectedSeatsCount = selectedSeats.length;
//     setCount(selectedSeatsCount);
//     setTotal(selectedSeatsCount * ticketPrice);
//     localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
//   };

//   // Assuming you have a list of movies with their prices
//   const movies = [
//     { name: 'Movie 1', price: 10 },
//     { name: 'Movie 2', price: 15 },
//     // Add more movies as needed
//   ];

//   return (
//     <div>
//       <select id="movie" onChange={handleMovieChange} value={movies[selectedMovieIndex].price}>
//         {movies.map((movie, index) => (
//           <option key={index} value={movie.price}>
//             {movie.name} - ${movie.price}
//           </option>
//         ))}
//       </select>

//       <div className="container">
//         {/* Render your seats using JSX */}
//         {Array.from({ length: 10 }, (_, row) => (
//           <div key={row} className="row">
//             {Array.from({ length: 10 }, (_, col) => {
//               const seatIndex = row * 10 + col;
//               const isOccupied = () => {
//                 // Assuming you have some data structure to determine occupied seats
//                 // For example, you might have an array of occupied seat indices
//                 const occupiedSeats = [5, 10, 15]; // Example occupied seats
//                 return occupiedSeats.includes(seatIndex);
//               };
//               const isSelected = selectedSeats.includes(seatIndex);
//               return (
//                 <div
//                   key={col}
//                   className={`seat ${isOccupied() ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
//                   onClick={() => handleSeatClick(seatIndex)}
//                 />
//               );
//             })}
//           </div>
//         ))}
//       </div>

//       <p>Selected Seats: {count}</p>
//       <p>Total: ${total}</p>
//     </div>
//   );
// };

// export default SeatBooking;



import React, { useState, useEffect } from 'react';

const Seats = () => {
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
        <label>Pick a movie:</label>
        <select id="movie" onChange={handleMovieChange} value={ticketPrice}>
          <option value="10">Avengers: Endgame ($10)</option>
          <option value="12">Joker ($12)</option>
          <option value="8">Toy Story 4 ($8)</option>
          <option value="9">The Lion King ($9)</option>
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
    </div>
  );
};

export default Seats;
