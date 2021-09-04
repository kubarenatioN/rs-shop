import { IProduct } from "src/app/shared/models/product.model";

export interface IGoodsResponse {
  [baseCategory: string]: IGoodsBaseCategory
}

interface IGoodsBaseCategory {
  [subCategories: string]: IProduct[]
}