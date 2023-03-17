import { Category } from "./category";
import { Tags } from "./tags";

export interface Products {
    id?          : number   ,
    imageUrl     : string
    productName  : string   ,
    categoryName : string   ,
    tagName      : string   ,
    category?     : Category ,
    tag?          : Tags     ,
    price        : number   ,
    tagId ?: number,
    categoryId? : number
}
