import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithEgresos } from '../../state/dashboard.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = []; 
  subscription: Subscription;

  constructor(
    private store: Store<AppStateWithEgresos>,
    private ingresoEgresoService: IngresoEgresoService
  ) { 
    this.subscription = this.store.select('dashboard').subscribe(({items}) => {
      this.items = items;
      console.log(this.items);
      
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  deleteItem(uid: string){
    console.log(uid);
    
    this.ingresoEgresoService.deleteItems(uid)
      .then(() => {
        Swal.fire('Objeto Elminado', 'Objeto eliminado', 'success')
      })
      .catch((err) => {
        Swal.fire('Error en la eliminacion', err.message, 'error')
      })
  }
}
