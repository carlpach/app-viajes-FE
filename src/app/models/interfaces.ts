export interface ItinerarioI{
  Dia1: string;
  Dia2: string;
}

export interface ActividadesI{
  Itinerario: ItinerarioI;
}

export interface Accommodation{
  _id: string;
  Nombre: string;
  Ubicacion: number;
  Precio: number;
  Descripcion: string;
  Caratula: string;
  Imagen: string;
  Actividades: ActividadesI;
}

export interface UserI{
  id?: string;
  email: string;
  password: string;
  role?: string;
}
