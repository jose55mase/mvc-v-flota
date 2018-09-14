export class User { 
    id : number;
    nombre : string;
    apellido : string;
    cedula : string;
    correo : string;
    telefono :string;
    usuario : string;
    clave : string;
    cargo : string;
    estado : boolean;

    constructor(){

    }

    get getClave(){
        return this.clave; 
    }
    public  setClave(clave){ this.clave = clave }
}