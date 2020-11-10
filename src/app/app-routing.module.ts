import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from './services/auth-guard.service';
import { ListDetailComponent } from './list-detail/list-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard]},  
  { path: 'todo-list/:id/:name', component: ListDetailComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
