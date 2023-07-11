export interface ItinerarioI{
  Dia1: string,
  Dia2: string,
}

export interface AccommodationsI {
  _id: string,
  name: string,
  city: string,
  LowerPrice: number,
  type: [],
  category: [],
  level: [],
  location: {
    lat: number,
    lng: number
  },
  images: string[],
  rooms: string[],
}

export interface RoomI {
  _id: string,
  name: number,
  description: string,
  features: [],
  price: number,
  images: string[],

}

export interface BookingI {
  _id: string,
  bookingCode: number,
  name: string,
  lastname: string,
  dateEntry: string,
  dateDeparture: string,
  nights: number,
  people: number,
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
