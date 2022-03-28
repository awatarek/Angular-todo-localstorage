import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { RouterModule } from '@angular/router';
import { TodoRouter } from './todos-routing.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './component/todo-item/todo-item.component';
import { TodoCreatorComponent } from './component/todo-creator/todo-creator.component';
import { TodoTableComponent } from './component/todo-table/todo-table.component';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    TodosComponent,
    TodoItemComponent,
    TodoCreatorComponent,
    TodoTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(TodoRouter),
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    SelectButtonModule,
    CalendarModule,
    ToastModule
  ]
})
export class TodosModule { }
