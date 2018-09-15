export class Logs{
    usuario : string;
	modulo : string;
	accion : string;
	fecha =  new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
}