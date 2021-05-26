import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MultiDataSet, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AppStateWithEgresos } from 'src/app/dashboard/state/dashboard.reducer';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
})
export class GraficaComponent implements OnInit, OnDestroy {

  totalIngresos = 0;
  totalEgresos = 0;
  subscription: Subscription;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(
    private store: Store<AppStateWithEgresos>
  ) {
    this.subscription = this.store.select('dashboard')
    .subscribe(({items}) => {
      for (const item of items) {
        if (item.type == 'ingreso') {
          this.totalIngresos += item.amount;
        } else {
          this.totalEgresos += item.amount;
        }
      }
      this.doughnutChartData = [ [this.totalIngresos, this.totalEgresos] ];
    })
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
