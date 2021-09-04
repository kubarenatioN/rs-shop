import { IProduct } from "./product.model";

export interface IBaseCategory {
  id: string
  name: string
  subCategories: IProduct[]
}