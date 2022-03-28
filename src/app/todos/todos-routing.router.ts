import { Routes } from '@angular/router';
import { TodoCreatorComponent } from './component/todo-creator/todo-creator.component';
import { TodoTableComponent } from './component/todo-table/todo-table.component';
import { TodosComponent } from './todos.component';



export let TodoRouter: Routes = [
    {path: '', component: TodosComponent, children: [
        {path: 'create', component: TodoCreatorComponent},
        {path: 'edit/:id', component: TodoCreatorComponent},
        {path: '', component: TodoTableComponent},
    ]}
];
