export interface ItinerarioI{
  Dia1: string,
  Dia2: string,
}

export interface AccommodationsI {
  _id: string,
  name: string,
  city: string,
  type: [],
  category: [],
  level: [],
  location: {
    lat: number,
    lng: number
  },
  mainImage: string,
  images: [],
  rooms: [],
}

export interface RoomI {
  _id: string,
  name: number,
  description: string,
  features: [],
  price: number,
  mainImage: string,
  images: [],

}

export interface BookingI {
  _id: string,
  bookingCode: number,
  name: string,
  surname: string,
  dateEntry: string,
  dateDeparture: string,
  nights: number,
  timeCheckin: string,
  petitionCustomer: string,
  image: string,
  room: string,

}

export interface UserI{
  id?: string,
  email: string,
  password: string,
  role?: string,
}
