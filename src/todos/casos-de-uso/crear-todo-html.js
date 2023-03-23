import { Todo } from "../models/todo.model"

/**
 * 
 * @param {Todo} todo 
 */
export const crearTodoHTML = (todo) => {
    if (!todo) throw new Error('A TODO object is required')


    const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${ todo.hecho ? 'checked' : ''}>
                    <label>${todo.descripcion}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
                  `

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);
    if ( todo.hecho )
        liElement.classList.add('completed');

    return liElement;
}