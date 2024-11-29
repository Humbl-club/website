import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import '@/styles/blocks/product-recommendations.scss'

class ProductRecommendations extends window.HTMLElement {
  // init Swiper:
  initSwiper() {
    const swiper = this.querySelector('.swiper')
    if (swiper) {
      const nextEl = swiper.parentElement.parentElement.querySelector('.next')
      const prevEl = swiper.parentElement.parentElement.querySelector('.prev')
      new Swiper(swiper, {
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

  connectedCallback() {
    fetch(this.dataset.url)
      .then((response) => response.text())
      .then((text) => {
        const html = document.createElement('div')
        html.innerHTML = text
        const recommendations = html.querySelector('product-recommendations')

        if (recommendations && recommendations.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML
          this.initSwiper()

          const mobileModal = document.getElementById('mobile-modal')
          if (mobileModal) {
            setTimeout(() => {
              mobileModal.initCardButtons()
            })
          }
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }
}

window.customElements.define('product-recommendations', ProductRecommendations)
