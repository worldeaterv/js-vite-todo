
import { v4 as uuidv4 } from 'uuid';

export class Todo {

    /**
     * 
     * @param {String} descripcion La descripcion de lo que será tu tarea.
     */
    constructor( descripcion ){

        
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.hecho = false;
        this.creadoEl = new Date();
    }

}