import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { RegistrarEmpleadosComponent } from './components/registrar-empleados/registrar-empleados.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: "Empleados",component:EmpleadosComponent},
  {path: "registrarEmpleados", component:RegistrarEmpleadosComponent},
  {path: "**", redirectTo:"Empleados",pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
