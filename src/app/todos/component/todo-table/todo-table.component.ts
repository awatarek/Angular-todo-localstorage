import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TodoCache } from 'src/app/core/model/todocache.model';
import { TodoService } from 'src/app/core/service/todo.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
})
export class TodoTableComponent implements OnInit {

  public todos: TodoCache;
  public form: FormGroup;

  constructor(private todo: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todo.getTodos();
  }

  public todoEvent($event){
    if($event == "refresh"){
      this.todo.reload();
      this.todos = this.todo.getTodos();
    }
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

}
