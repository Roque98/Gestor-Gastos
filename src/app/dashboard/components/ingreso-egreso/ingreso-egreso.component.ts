import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import * as uiActions from '../../../shared/state/ui.actions';
import Swal from 'sweetalert2';
import { Tag } from 'src/app/models/tag.model';
import { tagsEgreso, tagsIngreso } from '../../../models/tags.data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';
  isLoading: boolean;
  uiSubscription: Subscription;
  tagsEgreso: Tag[] = tagsEgreso;
  tagsIngreso: Tag[] = tagsIngreso;
  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { 
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
      tag: ['', Validators.required],
    })
    
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.isLoading = ui.isLoading;
    })
    
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe;
  }

  guardar(){

    const { description, amount, tag } = this.form.value;
    
    const ingresoEgreso  = new IngresoEgreso(description, amount, this.tipo, tag);
    this.store.dispatch(uiActions.isLoading());
    
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        Swal.fire('Registro creado', description, 'success')
        this.form.reset(); 
      })
      .catch((error) => {
        Swal.fire('Error', error, 'error');
      })
      .finally(() => {
        this.store.dispatch(uiActions.stopLoading())
      })
  }

}
