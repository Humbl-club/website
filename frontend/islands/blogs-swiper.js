import Swiper from 'swiper'
import '@/styles/blocks/blogs-swiper.scss'
import { Navigation } from 'swiper/modules'

class BlogsSwiper extends window.HTMLElement {
  connectedCallback() {
    this.initSwiper()
  }

  initSwiper() {
    if (this.classList.contains('swiper')) {
      const nextEl = this.parentElement.querySelector('.next')
      const prevEl = this.parentElement.querySelector('.prev')
      new Swiper(this, {
        // configure Swiper to use modules
        slidesPerView: 'auto',
        grabCursor: true,
        speed: 500,
        navigation: {
          nextEl,
          prevEl
        },
        modules: [Navigation]
      })
    }
  }
}

window.customElements.define('blogs-swiper', BlogsSwiper)
