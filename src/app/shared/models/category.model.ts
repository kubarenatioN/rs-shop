import { ISecondaryCategory } from './secondary-category.model';

export interface ICategory {
  id: string
  name: string
  // subCategories: string[]
  subCategories: ISecondaryCategory[]
}
