import { trapFocus, removeTrapFocus } from '@/lib/a11y'
import { disableScroll, enableScroll } from '@/lib/utils'

class CartDrawer extends window.HTMLElement {
  connectedCallback() {
    this.addEventListener(
      'keyup',
      (evt) => evt.code === 'Escape' && this.close()
    )
    this.querySelector('#CartDrawer-Overlay').addEventListener(
      'click',
      this.close.bind(this)
    )

    window.openCartDrawer = this.open.bind(this)
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy)
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {
      this.classList.add('active')
    })

    this.addEventListener(
      'transitionend',
      () => {
        const containerToTrapFocusOn = document.getElementById('CartDrawer')
        const focusElement = this.querySelector('[tabindex="-1"]')
        trapFocus(containerToTrapFocusOn, focusElement)
      },
      { once: true }
    )

    disableScroll()
  }

  close() {
    this.classList.remove('active')
    removeTrapFocus(this.activeElement)
    enableScroll()
  }

  renderContents(parsedState) {
    this.productId = parsedState.id
    this.getSectionsToRender().forEach((section) => {
      const sectionElement = section.selector
        ? document.querySelector(section.selector)
        : document.getElementById(section.id)
      sectionElement.innerHTML = this.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector
      )
    })

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener(
        'click',
        this.close.bind(this)
      )
      this.open()
    })
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new window.DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer'
      },
      {
        id: 'cart-icon-bubble'
      }
    ]
  }

  setActiveElement(element) {
    this.activeElement = element
  }
}

window.customElements.define('cart-drawer', CartDrawer)
