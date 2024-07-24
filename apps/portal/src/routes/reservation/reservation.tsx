import { Link, useParams } from "react-router-dom";

const Reservation = () => {
  const params = useParams();

  return (
    <div>
      <Link to="/reservations">Reservations Overview</Link>
      <h2>Reservation {params.reservationId}</h2>
    </div>
  );
};
export default Reservation;
