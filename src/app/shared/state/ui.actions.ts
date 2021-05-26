import { createAction } from "@ngrx/store";

const commonDescription = '[UI]'

export const isLoading = createAction(`${commonDescription} isLoading`)
export const stopLoading = createAction(`${commonDescription} stopLoading`)