import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import '@/styles/blocks/phone-number.scss'

class PhoneNumber extends window.HTMLElement {
  connectedCallback() {
    const phoneInput = this.querySelector('#ContactForm-phone')
    const errorTel = document.querySelector('#errorField')

    const iti = intlTelInput(phoneInput, {
      strictMode: true,
      showSelectedDialCode: true,
      countrySearch: false,
      separateDialCode: true,
      formatOnDisplay: true,
      useFullscreenPopup: false,
      placeholderNumberType: 'MOBILE',
      nationalMode: false,
      onlyCountries: [],
      geoIpLookup: false,
      initialCountry: 'US',
      loadUtils: () => import('intl-tel-input/utils'),
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js'
    })

    const reset = () => {
      phoneInput.classList.remove('error')
      errorTel.innerHTML = ''
      errorTel.classList.add('hide')
    }
    const showError = (msg) => {
      phoneInput.classList.add('error')
      errorTel.innerHTML = msg
      errorTel.classList.remove('hide')
    }

    const errorMap = [
      'Enter a valid phone number',
      'Invalid country code',
      'Number is Too short',
      'Number is Too long'
    ]
    const form = this.closest('form')
    if (form) {
      const btnSubmit = form.querySelector('button[type="submit"]')

      phoneInput.addEventListener('input', (event) => {
        setTimeout(function () {
          reset()
          if (iti.isValidNumberPrecise()) {
            phoneInput.classList.remove('error')
            btnSubmit.removeAttribute('disabled')
          } else {
            const errorCode = iti.getValidationError()
            const msg = errorMap[errorCode] || 'Enter a valid phone number'
            btnSubmit.setAttribute('disabled', 'true')
            phoneInput.classList.add('error')
            showError(msg)
          }
        }, 1000)
      })
    }
  }
}

window.customElements.define('phone-number', PhoneNumber)
