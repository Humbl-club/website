import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import '@/styles/blocks/phone-number.scss'

class PhoneNumber extends window.HTMLElement {
    connectedCallback() {
        let phoneInput = this.querySelector("#ContactForm-phone"),
            errorTel = document.querySelector("#errorField");

        let iti = intlTelInput(phoneInput, {
            strictMode: true,
            showSelectedDialCode: true,
            countrySearch: false,
            separateDialCode: true,
            formatOnDisplay: true,
            useFullscreenPopup: false,
            placeholderNumberType: "MOBILE",
            nationalMode: false,
            onlyCountries: [],
            geoIpLookup: false,
            initialCountry: "US",
            loadUtils: () => import("intl-tel-input/utils"),
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js"
        });

        let reset = () => {
            phoneInput.classList.remove("error");
            errorTel.innerHTML = "";
            errorTel.classList.add("hide");
        };
        let showError = (msg) => {
            phoneInput.classList.add("error");
            errorTel.innerHTML = msg;
            errorTel.classList.remove("hide");
        };

        let errorMap = ["Enter a valid phone number", "Invalid country code", "Number is Too short", "Number is Too long"],
            form = document.querySelector('#ContactForm'),
            btnSubmit = form.querySelector('button[type="submit"]');

        phoneInput.addEventListener('input', (event) => {
            setTimeout(function () {

                reset();
                if (!phoneInput.value.trim()) {
                    let msg = '';

                } else if (iti.isValidNumberPrecise()) {
                    phoneInput.classList.remove('error');
                    btnSubmit.removeAttribute('disabled');
                } else {
                    let errorCode = iti.getValidationError(),
                        msg = errorMap[errorCode] || "Enter a valid phone number";
                    btnSubmit.setAttribute('disabled', 'true');
                    phoneInput.classList.add('error');
                    showError(msg);
                }
            }, 1000);
        });
    }
}

window.customElements.define('phone-number', PhoneNumber)
