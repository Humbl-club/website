import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import '@/styles/blocks/phone-number.scss';

class PhoneNumber extends window.HTMLElement {
    connectedCallback() {
        const phoneInput = this.querySelector('#ContactForm-phone');

        const iti = intlTelInput(phoneInput, {
            strictMode: true,
            showSelectedDialCode: true,
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
                'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js',
        });

        const errorMap = [
            'Enter a valid phone number',
            'Invalid country code',
            'Number is too short',
            'Number is too long',
        ];

        const form = this.closest('form');
        if (form) {
            const btnSubmit = form.querySelector('button[type="submit"]');
            const validateAllFields = new CustomEvent('validateFields');

            phoneInput.addEventListener('input', () => {
                clearError();

                if (iti.isValidNumber()) {
                    phoneInput.classList.remove('error');
                    btnSubmit.dispatchEvent(validateAllFields);
                } else {
                    const errorCode = iti.getValidationError();
                    const msg = errorMap[errorCode] || 'Enter a valid phone number';
                    showError(msg);
                    btnSubmit.setAttribute('disabled', 'true');
                }
            })

            const codeSelect = this.querySelector('.iti__country-container');
            const showError = (msg) => {
                let errorElement = phoneInput.nextElementSibling;

                if (!errorElement || !errorElement.classList.contains('error-field')) {
                    errorElement = document.createElement('div');
                    errorElement.classList.add('error-field');
                    phoneInput.insertAdjacentElement('afterend', errorElement);
                }
                errorElement.textContent = msg;
                phoneInput.classList.add('error');
                codeSelect.classList.add('error');
            };

            const clearError = () => {
                const errorElement = phoneInput.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-field')) {
                    errorElement.remove();
                }
                phoneInput.classList.remove('error');
                codeSelect.classList.remove('error');
            };
        }
    }
}

window.customElements.define('phone-number', PhoneNumber);