import { json } from '@/lib/countries.js'
class CountryList extends window.HTMLElement {
  connectedCallback() {
    const countrySelect = this.querySelector('#ContactForm-country')
    if (countrySelect) {
      json.forEach((country) => {
        const option = document.createElement('option')
        option.value = country.name
        option.textContent = country.name
        countrySelect.appendChild(option)
      })

      const cartSelect = this.querySelector('cart-select')
      if (cartSelect && 'init' in cartSelect) {
        const selectitems = cartSelect.querySelector('.select-items')
        if (selectitems) {
          selectitems.remove()
        }
        cartSelect.init()
      }
    }
  }
}

window.customElements.define('country-list', CountryList)
