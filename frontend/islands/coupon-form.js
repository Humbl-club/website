import '@/styles/blocks/coupon-form.scss'

class CouponForm extends window.HTMLElement {
  connectedCallback() {
    this.init()
    this.style.setProperty('transition', 'opacity var(--time)')
    this.style.opacity = 1
  }

  init() {
    this.button = this.querySelector('.coupon-btn')
    this.input = this.querySelector('.coupon-input')
    if (this?.button && this?.input) {
      this.input.addEventListener('keypress', (event) => {
        const btn = 0 || event.keyCode || event.charCode
        if (btn === 13) {
          event.preventDefault()
          event.stopImmediatePropagation()
          this.renderSectionsFromFetch()
        }
      })
      this.input.addEventListener('change', (event) => {
        event.stopImmediatePropagation()
      })
      this.button.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopImmediatePropagation()
        this.renderSectionsFromFetch()
      })
    }
  }

  async renderSectionsFromFetch() {
    try {
      const response = await fetch(this.dataset.action + this.input.value)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const cartItems =
        this.closest('cart-items') ||
        document.querySelector('cart-drawer-items')
      if (cartItems) {
        const quantityInput = cartItems.querySelector('.quantity-input-field')
        if (quantityInput) {
          cartItems.updateQuantity(
            quantityInput.dataset.index,
            quantityInput.value
          )
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

window.customElements.define('coupon-form', CouponForm)
