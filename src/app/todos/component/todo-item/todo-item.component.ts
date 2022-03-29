import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TodoTask } from 'src/app/core/model/todotask.model';
import { TodoService } from 'src/app/core/service/todo.service';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input()
  public todos: TodoTask;
  @Output() 
  public todoEvent = new EventEmitter<string>();

  constructor(private todo: TodoService, private route: Router) { }

  ngOnInit(): void {

  }

  public remove(id: number){
    this.todo.remove(this.todos.id);
    this.todoEvent.emit("refresh");
  }

  public edit(id: number){
    this.route.navigate([`edit/${id}`])
  }

  public importancyColor(importancy: string){
    if(importancy){
      return importancy;
    } else {
      return null;
    }
  }
}
