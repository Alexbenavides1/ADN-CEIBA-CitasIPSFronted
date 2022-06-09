import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitaComponent } from './components/cita/cita.component';
import { AsignarCitaComponent } from './components/asignar-cita/asignar-cita.component';
import { ListarCitasPendientesComponent } from './components/listar-citas-pendientes/listar-citas-pendientes.component';
import { ListarCitasCanceladasComponent } from './components/listar-citas-canceladas/listar-citas-canceladas.component';

const routes: Routes = [
  {
    path: '',
    component: CitaComponent,
    children: [
      {
        path: 'asignar',
        component: AsignarCitaComponent
      },
      {
        path: 'listar/pendientes',
        component: ListarCitasPendientesComponent
      },
      {
        path: 'listar/canceladas',
        component: ListarCitasCanceladasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitaRoutingModule { }
