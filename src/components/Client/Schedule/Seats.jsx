import React, { useEffect, useState } from "react";
import { firestore } from "../../../utils/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(10);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [asientos, setAsientos] = useState([]);
  const [parentDocumentId, setParentDocumentId] = useState(null);

  useEffect(() => {
    const unsubscribe = populateUI(); // Llama a populateUI() cuando el componente se monta

    return () => {
      unsubscribe(); // Cancela el observador cuando el componente se desmonta
    };
  }, []);

  const sendSelectedSeatsToFirebase = async () => {
    try {
      const batch = [];
      selectedSeats.forEach((seatId) => {
        const seatDocRef = doc(firestore, "seats", seatId);
        batch.push(setDoc(seatDocRef, { occupied: true }));
      });
      await Promise.all(batch);
      console.log("Asientos enviados correctamente a Firebase");
    } catch (error) {
      console.error(
        "Error al enviar los asientos seleccionados a Firebase:",
        error
      );
    }
  };

  const handleSeatClick = (e, seatId) => {
    if (!e.target.classList.contains("occupied")) {
      e.target.classList.toggle("selected");
      updateSelectedCount(seatId);
    }
  };

  const updateSelectedCount = (seatId) => {
    const updatedSelectedSeats = [...selectedSeats];
    const seatIndex = updatedSelectedSeats.indexOf(seatId);
    if (seatIndex !== -1) {
      updatedSelectedSeats.splice(seatIndex, 1);
    } else {
      updatedSelectedSeats.push(seatId);
    }
    setSelectedSeats(updatedSelectedSeats);
    setSelectedSeatsCount(updatedSelectedSeats.length);
  };

  const populateUI = () => {
    try {
      const seatCollectionRef = collection(firestore, "seats");
      const unsubscribe = onSnapshot(seatCollectionRef, (querySnapshot) => {
        const asientosData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const estado = data.occupied;
          const id = doc.id;

          asientosData.push({
            id: id,
            estado: estado,
            ...data,
          });
        });

        setAsientos(asientosData);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error obteniendo asientos: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    applyOccupiedStyles(); // Aplica los estilos para los asientos ocupados después de cargar los datos
  }, [asientos]);

  const applyOccupiedStyles = () => {
    const occupiedSeats = document.querySelectorAll(".seat");
    occupiedSeats.forEach((seat) => {
      const seatId = seat.dataset.seatId;
      const seatData = asientos.find((asiento) => asiento.id === seatId);
      if (seatData && seatData.estado) {
        seat.classList.add("occupied");
        // console.log("sijala")
      }
    });
  };

  return (
    <div className="container">
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
      <div className="row">
        <div
          className="seat"
          data-seat-id="seat1"
          onClick={(e) => handleSeatClick(e, "seat1")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat2"
          onClick={(e) => handleSeatClick(e, "seat2")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat3"
          onClick={(e) => handleSeatClick(e, "seat3")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat4"
          onClick={(e) => handleSeatClick(e, "seat4")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat5"
          onClick={(e) => handleSeatClick(e, "seat5")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat6"
          onClick={(e) => handleSeatClick(e, "seat6")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat7"
          onClick={(e) => handleSeatClick(e, "seat7")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat8"
          onClick={(e) => handleSeatClick(e, "seat8")}
        ></div>
      </div>
      <div className="row">
        <div
          className="seat"
          data-seat-id="seat9"
          onClick={(e) => handleSeatClick(e, "seat9")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat10"
          onClick={(e) => handleSeatClick(e, "seat10")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat11"
          onClick={(e) => handleSeatClick(e, "seat11")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat12"
          onClick={(e) => handleSeatClick(e, "seat12")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat13"
          onClick={(e) => handleSeatClick(e, "seat13")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat14"
          onClick={(e) => handleSeatClick(e, "seat14")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat15"
          onClick={(e) => handleSeatClick(e, "seat15")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat16"
          onClick={(e) => handleSeatClick(e, "seat16")}
        ></div>
      </div>
      <div className="row">
        <div
          className="seat"
          data-seat-id="seat17"
          onClick={(e) => handleSeatClick(e, "seat17")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat18"
          onClick={(e) => handleSeatClick(e, "seat18")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat19"
          onClick={(e) => handleSeatClick(e, "seat19")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat20"
          onClick={(e) => handleSeatClick(e, "seat20")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat21"
          onClick={(e) => handleSeatClick(e, "seat21")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat22"
          onClick={(e) => handleSeatClick(e, "seat22")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat23"
          onClick={(e) => handleSeatClick(e, "seat23")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat24"
          onClick={(e) => handleSeatClick(e, "seat24")}
        ></div>
      </div>
      <div className="row">
        <div
          className="seat"
          data-seat-id="seat25"
          onClick={(e) => handleSeatClick(e, "seat25")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat26"
          onClick={(e) => handleSeatClick(e, "seat26")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat27"
          onClick={(e) => handleSeatClick(e, "seat27")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat28"
          onClick={(e) => handleSeatClick(e, "seat28")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat29"
          onClick={(e) => handleSeatClick(e, "seat29")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat30"
          onClick={(e) => handleSeatClick(e, "seat30")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat31"
          onClick={(e) => handleSeatClick(e, "seat31")}
        ></div>
        <div
          className="seat"
          data-seat-id="seat32"
          onClick={(e) => handleSeatClick(e, "seat32")}
        ></div>
      </div>

      {/* Add other rows here */}

      <p className="text">
        You have selected <span>{selectedSeatsCount}</span> seats.
      </p>

      <button onClick={sendSelectedSeatsToFirebase}>Enviar asientos</button>
    </div>
  );
};

export default SeatBooking;
