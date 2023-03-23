import todoStore, { Filtros } from "../../store/todo.store";

let elemento;
/**
 * 
 * @param {String} elementoId 
 */
export const renderPendientes = ( elementoId ) => {


    if (!elemento)
        elemento = document.querySelector( elementoId );
        
    if (!elemento)
        throw new Error (`Elemento ${elemento} no encontrado`);

    elemento.innerHTML = todoStore.getTodos( Filtros.Pendiente ).length;
}