import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {

  @Input() totalIngresos = 0;
  @Input() totalEgresos = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
