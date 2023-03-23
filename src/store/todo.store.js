
import { Todo } from "../todos/models/todo.model"


export const Filtros = {
    MostrarTodos: 'mostrarTodos',
    Completado: 'Completado',
    Pendiente: 'Pendiente',
}

const estado = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del universo'),
    ],
    filtro: Filtros.MostrarTodos,
}

const iniciarStore = () => {
    cargarStore();
    console.log('Inicio Store 🥑');
}


const cargarStore = () => {
    if( !localStorage.getItem('estado') ) return;

    const { todos = [], filtro = Filtros.MostrarTodos} = JSON.parse( localStorage.getItem('estado') );
    estado.todos = todos;
    estado.filtro = filtro;
}

const saveStateToLocalStorage = () => {

    
    localStorage.setItem('estado', JSON.stringify(estado));
}
const getTodos = (filtro = Filtros.MostrarTodos) => {

    switch (filtro) {
        case Filtros.MostrarTodos:
            return [...estado.todos];

        case Filtros.Completado:
            return estado.todos.filter( todo => todo.hecho);

        case Filtros.Pendiente:
            return estado.todos.filter( todo => !todo.hecho);    

        default:
            throw new Error (`Opcion ${ filtro } no es valida.`)
    }
}

/**
 * 
 * @param {String} descripcion 
 */
const añadirTodo = (descripcion) => {

    if ( !descripcion ) throw new Error('Ingresa la descripción de tu tarea.');

    estado.todos.push(new Todo(descripcion));

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId
 */

const alternarTodo = (todoId) => {
    
    estado.todos = estado.todos.map( todo => {
        if (todo.id === todoId){
            todo.hecho = !todo.hecho;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

const eliminarTodo = (todoId) => {
    estado.todos = estado.todos.filter( todo => todo.id !==todoId);

    saveStateToLocalStorage();
}

const borrarCompletados = () => {
    estado.todos = estado.todos.filter( todo => !todo.hecho );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filtros} nuevoFiltro 
 */
const setFiltro = (nuevoFiltro = Filtros.MostrarTodos) => {
    estado.filtro = nuevoFiltro;

    saveStateToLocalStorage();
}

const getFiltroSeleccionado = () => {
    return estado.filtro;
}

export default {
    alternarTodo,
    añadirTodo,
    borrarCompletados,
    cargarStore,
    eliminarTodo,
    getFiltroSeleccionado,
    getTodos,
    iniciarStore,
    setFiltro,

}
