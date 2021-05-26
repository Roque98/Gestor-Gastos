import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AppStateWithEgresos } from '../../state/dashboard.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  totalIngresos = 0;
  totalEgresos = 0;
  contadorItemsIngresos = 0;
  contadorItemsEgresos = 0;

  constructor(
    private store: Store<AppStateWithEgresos>
  ) { 
    this.store.select('dashboard')
    .subscribe(({items}) => {
      for (const item of items) {
        if (item.type == 'ingreso') {
          this.totalIngresos += item.amount;
          this.contadorItemsIngresos++;
        } else {
          this.totalEgresos += item.amount;
          this.contadorItemsEgresos ++;
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
