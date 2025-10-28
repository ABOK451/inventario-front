import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PersonalComponent } from './components/personal/personal.component';
import path from 'path';
import { BarraComponent } from './components/barra/barra.component';
import { ReportesComponent } from './components/reportes - dashboard/reportes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'personal',
    component: PersonalComponent
  },
  {
    path: 'barra',
    component: BarraComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
