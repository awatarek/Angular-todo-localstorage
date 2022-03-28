import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TodoCache } from 'src/app/core/model/todocache.model';
import { TodoTask } from 'src/app/core/model/todotask.model';
import { TodoService } from 'src/app/core/service/todo.service';

@Component({
  selector: 'todo-creator',
  templateUrl: './todo-creator.component.html',
  styleUrls: ['./todo-creator.component.scss'],
  providers: [MessageService]
})
export class TodoCreatorComponent implements OnInit {

  public todos: TodoCache;
  public todoTask: TodoTask;
  public form: FormGroup;
  public isEditing: boolean;
  public importanse = ["p1", "p2", "p3", "p4"]

  constructor(private todo: TodoService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id ;
    this.isEditing = id ? true : false;
    this.todos = this.todo.getTodos();

    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      tags: new FormControl(''),
      importancy: new FormControl(''),
      deadline: new FormControl('')
    })

    if(this.isEditing){
      this.todoTask = this.todos.todoList.find((val) => val.id == id);
      this.form.patchValue(this.todoTask);
    }

  }

  public formSubmition(){
    this.form.markAsTouched();

    if(this.form.valid){
      if(this.isEditing){
        for(let todo of this.todos.todoList){
          if(todo.id == this.todoTask.id){
            todo.name = this.form.value.name;
            todo.tags = this.form.value.tags;
            todo.importancy = this.form.value.importancy;
            todo.deadline = this.form.value.deadline;
          }
        }
        localStorage.setItem("todo", JSON.stringify(this.todos));
        this.messageService.add({severity: 'success', life: 6000, summary: "Todo has been edited!"})
      } else {
        this.todos.id++;
        this.todos.todoList.push({name: this.form.value.name, date: new Date, 
          id: this.todos.id, deadline: this.form.value.deadline, 
          importancy: this.form.value.importancy, tags: this.form.value.tags})
        localStorage.setItem("todo", JSON.stringify(this.todos));
        this.form.reset();
        this.messageService.add({severity: 'success', life: 6000, summary: "Todo has been added!"})
      }
    } else {
      this.messageService.add({severity: 'error', life: 6000, summary: "Check form for errors"})
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
