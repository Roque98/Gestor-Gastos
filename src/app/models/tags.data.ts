import { Tag } from "src/app/models/tag.model";

export const tagsEgreso: Tag[] = [
    {
        tagName: 'Vivienda',
        type: 'egreso',
        color: '#66CDD9',
        icon: 'fa-home'
    },
    {
        tagName: 'Alimento',
        type: 'egreso',
        color: '#04BF10',
        icon: 'fa-utensils'
    },
    {
        tagName: 'otro',
        type: 'egreso',
        color: '#20D67E',
        icon: 'fa-question'
    },  
]


export const tagsIngreso: Tag[] = [
    {
        tagName: 'sueldo',
        type: 'ingreso',
        color: '#66CDD9',
        icon: 'fa-building'
    },
    {
        tagName: 'negocio',
        type: 'ingreso',
        color: '#04BF10',
        icon: 'fa-briefcase'
    },
    {
        tagName: 'otro',
        type: 'ingreso',
        color: '#20D67E',
        icon: 'fa-question'
    },  
]