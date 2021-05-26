import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { User } from '../models/user.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as dashboardActions from './state/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  ingresoEgresoSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {
    this.subscription = this.store
      .select('auth')
      .pipe(
        filter((data) => {
          return data.user != null;
        })
      )
      .subscribe(({ user }) => {
        this.user = user;
        this.ingresoEgresoSubscription = this.ingresoEgresoService.initIngresoEgreso(this.user.uid)
          .subscribe((items) => {
            this.store.dispatch(dashboardActions.setItems({items}))
          })
      });

  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // this.ingresoEgresoSubscription.unsubscribe();
    // this.subscription.unsubscribe();
  }
}
