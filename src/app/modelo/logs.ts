export class Logs{
    usuario : string = localStorage.getItem('usuario');
	modulo : string;
	accion : string;
	fecha =  new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()+"Hora : "+new Date().getHours()+":"+new Date().getMinutes()+"m";
}