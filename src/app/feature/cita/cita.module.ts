import { NgModule } from '@angular/core';
import { CitaRoutingModule } from './cita-routing.module';
import { CitaComponent } from './components/cita/cita.component';
import { AsignarCitaComponent } from './components/asignar-cita/asignar-cita.component';
import { ListarCitasPendientesComponent } from './components/listar-citas-pendientes/listar-citas-pendientes.component';
import { ListarCitasCanceladasComponent } from './components/listar-citas-canceladas/listar-citas-canceladas.component';
import { SharedModule } from '@shared/shared.module';
import { CitaService } from './shared/service/cita.service';
import { InformacionCitaComponent } from './components/informacion-cita/informacion-cita.component';

@NgModule({
  declarations: [
    ListarCitasPendientesComponent,
    ListarCitasCanceladasComponent,
    AsignarCitaComponent,
    CitaComponent,
    InformacionCitaComponent,
    AsignarCitaComponent
  ],
  imports: [
    CitaRoutingModule,
    SharedModule
  ],
  providers: [CitaService]
})
export class CitaModule { }
