export class Rutas{
    id :string;
    fecha = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()+"Hora : "+new Date().getHours()+":"+new Date().getMinutes()+"m"; 
	vehiculo : string; 
	conductor : string; 
	ruta : string; 
	inicial_combustible : string; 	
	inicial_km : string; 	
}