import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Pipe({
  name: 'orderItems'
})
export class OrderItemsPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return [...items].sort((a, b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    })
  }

}
