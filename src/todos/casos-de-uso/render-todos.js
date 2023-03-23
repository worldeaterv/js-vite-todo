import { Todo } from "../models/todo.model";
import { crearTodoHTML } from "./crear-todo-html";

let elemento;

/**
 * 
 * @param {String} elementoId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementoId, todos = [] ) => {

    if ( !elemento)
        elemento = document.querySelector( elementoId );
    
    if ( !elemento) throw new Error(`Elemento ${elementoId} no se encontro`)

    elemento.innerHTML = '';
    
    todos.forEach( todo => {
        elemento.append( crearTodoHTML(todo) )
    });
}