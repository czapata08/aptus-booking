import { type GuestProfile } from "./guest.types"


export async function handleGuestProfile( guestProfile : GuestProfile) {

    console.log('Guest profile from services script: ', guestProfile)
    console.log('Hello from guest service function')

    return {
        status: 200
    }

}

