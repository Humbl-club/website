import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import '@/styles/blocks/product-recommendations.scss'
import '@/styles/blocks/featured-swiper.scss'

class FeaturedSwiper extends window.HTMLElement {
  connectedCallback() {
    this.initSwiper()

    const mobileModal = document.getElementById('mobile-modal')
    if (mobileModal) {
      setTimeout(() => {
        mobileModal.initCardButtons()
      })
    }
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

window.customElements.define('featured-swiper', FeaturedSwiper)
