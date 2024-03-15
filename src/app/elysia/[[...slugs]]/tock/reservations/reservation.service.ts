import { type Reservation } from "./reservation.types";

export async function handleReservationService(reservation: Reservation) {
  // console.log("Reservation object from reservation controller", reservation);

  console.log('Hello from reservation service function')

  return {
    status: 200,
  };
}
