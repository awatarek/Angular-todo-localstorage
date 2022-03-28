import { Injectable } from '@angular/core';
import { TodoCache } from '../model/todocache.model';
import { TodoTask } from '../model/todotask.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    public static todos: TodoCache;

    constructor() { 
        if(localStorage.getItem("todo")){
            TodoService.todos = JSON.parse(localStorage.getItem("todo"))
        } else {
            TodoService.todos = {todoList: [{name: "test", date: new Date, id: 1}], id: 1};
        }
    }

    public getTodos(): TodoCache{
        return TodoService.todos;
    }

    public getTodo(): TodoTask[]{
        return TodoService.todos.todoList;
    }

    public reload(){
        TodoService.todos = JSON.parse(localStorage.getItem("todo"));
    }

    public remove(id){
        let todoList: TodoTask[] = [];
        for(let todo of this.getTodo()){
          if(todo.id != id){
            todoList.push(todo);
          }
        }
    
        let newTodoCache: TodoCache = {id: TodoService.todos.id, todoList: todoList};
        localStorage.setItem("todo", JSON.stringify(newTodoCache));
        
        this.reload();
    }



}
