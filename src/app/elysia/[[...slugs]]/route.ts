import { Elysia } from "elysia";
import { reservationController } from "./tock/reservations/reservation.controller"
import { guestController } from "./tock/guest/guest.controller"


const app = new Elysia({ prefix: '/elysia' });

//use controllers
guestController(app)
reservationController(app)

//Compile the elysia application before incoming requests
app.compile()


export const POST = app.handle