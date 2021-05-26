import { createReducer, on, Action } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import * as authActions from "./auth.action";

export interface State {
    user: User
}

export const initialState:State = {
    user: null
}

const _authReducer = createReducer(
    initialState,
    on(authActions.setUser, (state, {user}) => {
        return {
            ...state,
            user: user
        }
    }),
    on(authActions.unSetUser, (state) => {
        return {
            ...state,
            user: null
        }
    })
)

export function authReducer(state: State, action: Action){
    return _authReducer(state, action)
}