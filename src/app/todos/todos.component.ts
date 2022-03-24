import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoCache } from '../core/model/todocache.model';
import { TodoTask } from '../core/model/todotask.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public todos: TodoCache;
  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("todo")){
      this.reload();
    } else {
      this.todos = {todoList: [{name: "test", date: new Date, id: 1}], id: 1};
    }

    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]))
    })
  }

  public formSubmition(){
    this.form.markAsTouched();

    if(this.form.valid){
      this.todos.id++;
      this.todos.todoList.push({name: this.form.value.name, date: new Date, id: this.todos.id})
      localStorage.setItem("todo", JSON.stringify(this.todos));
      this.form.reset();
    }
    this.reload();
  }


  public isErrorVisible(formControlName: string, errorName: string): boolean {
    if (formControlName == null) {
        return this.form.hasError(errorName);
    }

    let control = this.form.get(formControlName);
    if (control?.hasError(errorName) && control?.touched) {
        return true;
    }

    return false;
  }

  public isInvalid(formControlName: string): boolean {
    let control = this.form.get(formControlName);
    return control?.invalid && control?.touched;
  }

  public remove(id: number){
    let todoList: TodoTask[] = [];
    for(let todo of this.todos.todoList){
      if(todo.id != id){
        todoList.push(todo);
      }
    }

    let newTodoCache: TodoCache = {id: this.todos.id, todoList: todoList};
    localStorage.setItem("todo", JSON.stringify(newTodoCache));
    
    this.reload();
  }

  public reload(){
    this.todos = JSON.parse(localStorage.getItem("todo"));
  }

}
