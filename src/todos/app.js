
import html from './app.html?raw';
import todoStore, { Filtros } from '../store/todo.store';
import { renderTodos } from './casos-de-uso/render-todos';
import { renderPendientes } from './casos-de-uso/render-pendiente';



const ElementosIDs = {
    BorrarCompletados: '.clear-completed',
    NuevoTodoInput: '.new-todo',
    TodoList: '.todo-list',
    TodoFiltros: '.filtro',
    ContadorPendientesLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementoId Debes pasar la ID del div que está en el html donde lo mostrarás
 */ 
export const App = ( elementoId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getFiltroSeleccionado() );
        renderTodos( ElementosIDs.TodoList, todos );
        actualizarCuentaPendiente();
    }

    const actualizarCuentaPendiente = () => {
        renderPendientes(ElementosIDs.ContadorPendientesLabel);
    }
    
    // Cuando la función App() se llama
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementoId).append(app);
        displayTodos();
    })();

    
    // Referencias HTML
    const nuevaDescripcionInput = document.querySelector( ElementosIDs.NuevoTodoInput);
    const TodoListUL = document.querySelector( ElementosIDs.TodoList );
    const botonBorrarCompletados = document.querySelector( ElementosIDs.BorrarCompletados);
    const filtrosLis = document.querySelectorAll(ElementosIDs.TodoFiltros);

    // Listeners 
    // Añadir Todo
    nuevaDescripcionInput.addEventListener('keyup', (event) => {
        if ( event.keyCode !==13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.añadirTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    // Alternar Todo
    TodoListUL.addEventListener('click', (event) => {
        const elemento = event.target.closest('[data-id]');
        todoStore.alternarTodo(elemento.getAttribute('data-id'));
        displayTodos();
    });

    // Eliminar
    TodoListUL.addEventListener('click', (event) => {
        const elemento = event.target.closest('[data-id]');
        const botonEliminar = event.target.classList.contains('destroy');
        if( botonEliminar ){
            todoStore.eliminarTodo(elemento.getAttribute('data-id'));
        }
        displayTodos();
    });
    
    // Eliminar to-dos completados
    botonBorrarCompletados.addEventListener('click', () => {
       
        todoStore.borrarCompletados();
        displayTodos();
    });
    
    // Filtros

    filtrosLis.forEach (elemento => {
        elemento.addEventListener('click', (elemento) => {
            filtrosLis.forEach( el => el.classList.remove('selected') );
            elemento.target.classList.add('selected');
            console.log(elemento.target.text)

            switch(elemento.target.text){
                case 'Todos':
                    todoStore.setFiltro(Filtros.MostrarTodos);
                    break;
                case 'Pendientes':
                    todoStore.setFiltro(Filtros.Pendiente);
                    break;
                case 'Completados':
                    todoStore.setFiltro(Filtros.Completado);
                    break;
                
            }

            displayTodos();
        });

    });
}



