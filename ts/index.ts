import { Article } from "./type"

class Discount {
  isPercent: boolean
  amount: number
  constructor(isPercent: boolean, amount: number) {
    this.isPercent = isPercent
    this.amount = amount
  }
  apply(article: Article) {
    if (this.isPercent) {
      article.price = article.price - (article.price * this.amount)
    } else {
      article.price = article.price - this.amount
    }
  }
}

// A discount that shaves off 10 EUR

// const discount = new Discount(false, 10)
// discount.apply({
//   price: 39,
//   vat: 0.2,
//   title: 'Macbook Mini'
// })


let discount: Discount = new Discount(true, 0.2)

let allProductsTwentyBucks: Discount = {
  isPercent: false,
  amount: 20,
  apply(article) {
    article.price = 20
  }
}

type DiscountType = {
  isPercent: boolean,
  amount: number,
  apply(article: Article): void
}
// structural type system
let disco: DiscountType = new Discount(true, 0.2)