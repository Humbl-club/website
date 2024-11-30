import Swiper from 'swiper'
import { Navigation, EffectFade } from 'swiper/modules'
import '@/styles/blocks/complementary-block.scss'
import '@/styles/blocks/complementary-slider.scss'

class ComplementarySlider extends window.HTMLElement {
  // init Swiper:
  initSwiper() {
    const swiper = this.querySelector('.swiper')
    if (swiper) {
      const nextEl = swiper.querySelector('.next')
      const prevEl = swiper.querySelector('.prev')
      new Swiper(swiper, {
        // configure Swiper to use modules
        fadeEffect: {
          crossFade: true
        },
        rewind: true,
        slidesPerView: 'auto',
        effect: 'fade',
        grabCursor: true,
        speed: 500,
        navigation: {
          nextEl,
          prevEl
        },
        modules: [Navigation, EffectFade]
      })
    }
  }

  connectedCallback() {
    fetch(this.dataset.url)
      .then((response) => response.text())
      .then((text) => {
        const html = document.createElement('div')
        html.innerHTML = text
        const recommendations = html.querySelector('complementary-slider')
        if (recommendations && recommendations.innerHTML.trim().length) {
          this.innerHTML = recommendations.innerHTML
          this.initSwiper()
          this.classList.add('inited')
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }
}

window.customElements.define('complementary-slider', ComplementarySlider)
