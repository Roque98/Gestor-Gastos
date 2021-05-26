import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { IngresoEgresoComponent } from './components/ingreso-egreso/ingreso-egreso.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'estadistica',
        component: EstadisticaComponent
      },
      {
        path: 'detalle',
        component: DetalleComponent
      },
      {
        path: 'ingreso-egreso',
        component: IngresoEgresoComponent
      },
      {
        path: '**',
        redirectTo: 'estadistica'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }