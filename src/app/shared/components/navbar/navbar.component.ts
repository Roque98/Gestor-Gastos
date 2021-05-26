import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateWithEgresos } from 'src/app/dashboard/state/dashboard.reducer';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  user: User;
  subscription: Subscription;

  constructor(
    private store: Store<AppStateWithEgresos>
  ) { 
    this. subscription = this.store.select('auth')
      .subscribe(({user}) => {
        this.user = user;
      })  
  }

  ngOnInit(): void {
  }

}
