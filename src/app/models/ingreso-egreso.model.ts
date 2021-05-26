import { Tag } from "./tag.model";

export class IngresoEgreso {
    constructor(
        public description: string,
        public amount: number,
        public type: string,
        public tag: string,
        public uid?: string,
    ){

    }
}