import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

const commonDescription = '[auth]'
export const setUser = createAction(
    `${commonDescription} setUser`,
    props<{user: User}>()
);
export const unSetUser = createAction(`${commonDescription} unsetUser`);
