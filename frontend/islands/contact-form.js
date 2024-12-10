import '@/styles/blocks/contact-form.scss'
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

class ContactForm extends window.HTMLElement {
  connectedCallback() {
    const form = document.querySelector('.contact');

    if (form) {
      let phone_input = document.querySelector("#ContactForm-phone");

      let iti = intlTelInput(phone_input, {
        separateDialCode: true,
        onlyCountries: [],
        geoIpLookup: false,
        initialCountry: "Anguilla",
        loadUtils: () => import("intl-tel-input/utils"),
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js"
      });
    }
  }
}

window.customElements.define('contact-form', ContactForm)
