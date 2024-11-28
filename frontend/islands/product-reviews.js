import '@/styles/blocks/product-reviews.scss'

class ProductReviews extends window.HTMLElement {
  connectedCallback() {
    const averageRateBlock = this.querySelector(
      '.jdgm-rev-widg__summary-average'
    )
    const reviewsNumberBlock = this.querySelector(
      '.jdgm-rev-widg__summary-text'
    )

    if (reviewsNumberBlock) {
      let text = reviewsNumberBlock.innerHTML.split('Based on')
      if (text.length > 0) {
        text = text[1]
        if (text) {
          reviewsNumberBlock.innerHTML = text
        }
      }
    }

    if (averageRateBlock) {
      let averageRate = averageRateBlock.innerHTML.split('out of')
      if (averageRate.length) {
        averageRate = averageRate[0]
        averageRateBlock.innerHTML = Number(averageRate).toFixed(1)
      }
    }
  }
}

window.customElements.define('product-reviews', ProductReviews)
