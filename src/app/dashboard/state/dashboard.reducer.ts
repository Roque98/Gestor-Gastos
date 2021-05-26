import { createReducer, on } from "@ngrx/store";
import { Actions } from "@ngrx/store-devtools/src/reducer";
import { AppState } from "src/app/app.reducer";
import { IngresoEgreso } from "src/app/models/ingreso-egreso.model";
import { setItems, unSetItems } from "./dashboard.actions";

interface State {
    items: IngresoEgreso[]
}

export interface AppStateWithEgresos extends AppState {
    dashboard: State
}

export const initialState: State = {
    items: []
}

const _dashboardReducer = createReducer(
    initialState,
    on(setItems, (state, { items }) => {
        return {
            ...state,
            items: [...items]
        }
    }),
    on(unSetItems, (state) => {
        return {
            ...state,
            items: []
        }
    })
)

export function dashboardReducer(store: State, action: Actions ) {
    return _dashboardReducer(store, action);
}
