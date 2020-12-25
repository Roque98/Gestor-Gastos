import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [IngresoEgresoComponent, DetalleComponent, EstadisticaComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  
})
export class DashboardModule { }
