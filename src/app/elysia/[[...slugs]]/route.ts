import { Elysia } from "elysia";
import { reservationController } from "./tock/reservations/reservation.controller"
import { guestController } from "./tock/guest/guest.controller"


const app = new Elysia({ prefix: '/elysia' });

//use controllers
guestController(app)
reservationController(app)

export const POST = app.handle