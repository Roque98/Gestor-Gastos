import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from "src/app/models/ingreso-egreso.model";

const commonDescription = '[dashboard component]';
export const setItems = createAction(
    `${commonDescription} setItems`,
    props<{items: IngresoEgreso[]}>()
)
export const unSetItems = createAction(`${commonDescription} unSetItems`)