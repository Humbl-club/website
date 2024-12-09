import Swiper from 'swiper'
import { xl } from '@/lib/media'
import { Scrollbar } from 'swiper/modules'

class ProductSwiper extends window.HTMLElement {
  constructor() {
    super()
    this.swiper = null
    this.init = false
  }

  // init Swiper:
  initSwiper() {
    if (xl.matches) {
      if (this.init === false) {
        this.init = true
        this.swiper = new Swiper(this, {
          // configure Swiper to use modules
          slidesPerView: 'auto',
          grabCursor: true,
          speed: 500,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          modules: [Scrollbar]
        })
      }
    } else {
      if (this.swiper) {
        this.swiper.destroy()
        this.init = false
      }
    }
  }

  connectedCallback() {
    this.initSwiper()
    xl.addEventListener('change', this.initSwiper.bind(this))
  }
}

window.customElements.define('product-swiper', ProductSwiper)
