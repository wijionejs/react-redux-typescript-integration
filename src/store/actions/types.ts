import {DeleteTodoAction, FetchTodoAction} from "./todos";


export enum ActionTypes {
    fetchTodos = 'fetchTodos',
    deleteTodo = 'deleteTodo',
}

export type Action = FetchTodoAction | DeleteTodoAction;
