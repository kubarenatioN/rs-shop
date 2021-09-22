import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { IProduct } from 'src/app/shared/models/product.model'
import { MainPageHttpService } from '../../services/main-page-http.service'

const NUM_OF_SLIDES = 6
const PRODUCTS_PER_SLIDE = 6

@Component({
  selector: 'app-popular-goods',
  templateUrl: './popular-goods.component.html',
  styleUrls: ['./popular-goods.component.scss']
})
export class PopularGoodsComponent implements OnInit {
  slides: {
    item: IProduct
    category: string
    subcategory: string
  }[][] = []

  constructor(private http: MainPageHttpService) {}

  ngOnInit(): void {
    this.http
      .getAllGoods()
      .pipe(
        map(res => {
          const goodsWithCategories: {
            items: IProduct[]
            category: string
            subcategory: string
          }[] = []
          let allGoods: IProduct[] = []
          const categories = Object.keys(res)
          categories.forEach(category => {
            const subcategories = Object.keys(res[category])
            subcategories.forEach(subcategory => {
              const goods = res[category][subcategory]
              goodsWithCategories.push({
                category,
                subcategory,
                items: goods
              })
              allGoods = allGoods.concat(...goods)
            })
          })
          return {
            allGoods: allGoods.sort((b, a) => a.rating - b.rating),
            goodsWithCategories
          }
        })
      )
      .subscribe(res => {
        for (let i = 0; i < NUM_OF_SLIDES; i += 1) {
          const start = i * PRODUCTS_PER_SLIDE
          const end = start + PRODUCTS_PER_SLIDE
          const products = res.allGoods.slice(start, end)
          const slide = products.map(p => {
            const categories = res.goodsWithCategories.find(g =>
              g.items.map(it => it.id).includes(p.id)
            )!
            const itemWithCategories = {
              category: categories.category,
              subcategory: categories.subcategory,
              item: categories.items.find(it => it.id === p.id)!
            }
            return itemWithCategories
          })
          this.slides.push(slide)
        }
      })
  }
}
