import { IProduct } from 'src/app/shared/models/product.model';

export interface ICategoriesResponse {
  [category: string]: IGoodsSubcategories
}

interface IGoodsSubcategories {
  [subcategory: string]: IProduct[]
}
