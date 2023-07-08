export interface ItinerarioI{
  Dia1: string;
  Dia2: string;
}

export interface ActividadesI{
  Itinerario: ItinerarioI;
}

export interface AccommodationsI {
  _id: number;
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

export interface UserI{
  id?: string;
  email: string;
  password: string;
  role?: string;
}
