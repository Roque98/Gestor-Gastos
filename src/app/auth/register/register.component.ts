import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as uiActions from 'src/app/shared/state/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading: boolean;
  uiSubscription: Subscription;

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.uiSubscription = this.store.select('ui')
      .subscribe((ui) => {
        this.isLoading = ui.isLoading
      })
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  onSubmit(){
    if(this.form.invalid) return;
    const { name, email, password } = this.form.value;
    this.store.dispatch(uiActions.isLoading())
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    this.authService.crearUsuario(name, email, password)
      .then((data) => {
        // Swal.close()
        this.store.dispatch(uiActions.stopLoading())
        this.router.navigate(['/auth', 'login'])
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      })
  }

}
