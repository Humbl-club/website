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
    }
  }
}

window.customElements.define('country-list', CountryList)
