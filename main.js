import { App } from './src/todos/app';
import './style.css'
import todoStore from './src/store/todo.store';


todoStore.iniciarStore();

App('#app');