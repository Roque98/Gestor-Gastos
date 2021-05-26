import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './components/ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderItemsPipe } from './pipes/order-items.pipe';
import { BalanceComponent } from './components/estadistica/balance/balance.component';
import { GraficaComponent } from './components/estadistica/grafica/grafica.component';
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './state/dashboard.reducer';


@NgModule({
  declarations: [IngresoEgresoComponent, DetalleComponent, EstadisticaComponent, DashboardComponent, OrderItemsPipe, BalanceComponent, GraficaComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forFeature('dashboard', dashboardReducer)
  ],
  
})
export class DashboardModule { }
