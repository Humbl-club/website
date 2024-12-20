import '@/styles/blocks/contact-form.scss';

class ContactForm extends window.HTMLElement {
    connectedCallback() {
        this.init();

        const btnSubmit = this.querySelector('button[type="submit"]');
        const allInputs = this.querySelectorAll('input:not([type="hidden"]), textarea:not(#ContactForm-comment)'); // Исключаем textarea

        const validateAllFields = () => {
            let hasError = false;

            allInputs.forEach((input) => {
                if (input.classList.contains('error') || input.value.trim() === "") {
                    hasError = true;
                }
            });

            if (hasError) {
                btnSubmit.setAttribute('disabled', 'true');
            } else {
                btnSubmit.removeAttribute('disabled');
            }
        };

        const validateField = (input, validator, message) => {
            const value = input.value.trim();

            if (!validator(value)) {
                input.classList.add('error');
                showError(input, message);
            } else {
                input.classList.remove('error');
                clearError(input);
            }

            validateAllFields();
        };

        // Email validation
        const emailInput = this.querySelector('#ContactForm-email');
        emailInput.addEventListener('input', () => {
            validateField(emailInput, (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), 'Enter a valid email');
        });

        // Name validation
        const nameFields = this.querySelectorAll('.names');
        nameFields.forEach((field) => {
            field.addEventListener('input', () => {
                validateField(field, (value) => /^[^\d\s]+$/.test(value), 'Enter a valid name');
            });
        });

        // Generic validation for required fields
        allInputs.forEach((input) => {
            if (input.type !== 'email' && !input.classList.contains('names')) {
                input.addEventListener('input', () => {
                    validateField(input, (value) => value.length > 0, 'This field is required');
                });
            }
        });

        // Error display functions
        function showError(input, message) {
            let errorElement = input.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error-field')) {
                errorElement = document.createElement('div');
                errorElement.classList.add('error-field');
                input.insertAdjacentElement('afterend', errorElement);
            }
            errorElement.textContent = message;
        }

        function clearError(input) {
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-field')) {
                errorElement.remove();
            }
        }

        // Initial validation check
        validateAllFields();

        // AJAX form submission
        this.init();
    }

    init() {
        this.form = this.querySelector('form');
        if (this.form) {
            this.submit = this.form.querySelector('[type="submit"]');
            this.submit.addEventListener('click', (event) => {
                event.preventDefault();
                this.renderSectionsFromFetch(this.form.action, this.form);
            });
        }
    }

    async renderSectionsFromFetch(url, form) {
        const formData = new FormData(form);
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            let html = await response.text(),
                parser = new window.DOMParser().parseFromString(html, 'text/html'),
                form = parser.getElementById('ContactForm');

            this.innerHTML = form.innerHTML;
            this.init();
            let formContainer = this.closest('.modal-page');
            formContainer.classList.add('submitted');
        } catch (error) {
            console.error(error.message);
        }
    }
}

window.customElements.define('contact-form', ContactForm);