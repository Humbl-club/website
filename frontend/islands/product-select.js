class ProductSwiper extends window.HTMLElement {
  connectedCallback() {
    console.log('helo')
  }
}

window.customElements.define('product-swiper', ProductSwiper)
