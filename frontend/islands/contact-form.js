import '@/styles/blocks/contact-form.scss'

class ContactForm extends window.HTMLElement {
    connectedCallback() {
        this.init();

        const btnSubmit = this.querySelector('button[type="submit"]');
        const allInputs = this.querySelectorAll('input');

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

        // Email validation
        const emailInput = this.querySelector('#ContactForm-email');
        emailInput.addEventListener('input', () => {
            setTimeout(() => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const emailValue = emailInput.value.trim();
                const emailMsg = 'Enter a valid email';

                if (!emailRegex.test(emailValue)) {
                    emailInput.classList.add("error");
                    showError(emailInput, emailMsg);
                } else {
                    emailInput.classList.remove("error");
                    clearError(emailInput);
                }
                validateAllFields();
            }, 1000);
        });

        // Order number validation
        const orderNumberInput = this.querySelector('#ContactForm-order-number');
        orderNumberInput.addEventListener('input', () => {
            setTimeout(() => {
                const orderValue = orderNumberInput.value.trim();
                const orderMsg = 'Order number cannot be empty';

                if (orderValue === "") {
                    orderNumberInput.classList.add("error");
                    showError(orderNumberInput, orderMsg);
                } else {
                    orderNumberInput.classList.remove("error");
                    clearError(orderNumberInput);
                }
                validateAllFields();
            }, 1000);
        });

        // Name validation
        const nameFields = this.querySelectorAll('.names');
        nameFields.forEach((field) => {
            field.addEventListener('input', () => {
                setTimeout(() => {
                    const validateName = (input) => {
                        const value = input.value.trim();
                        return /^[^\d\s]+$/.test(value) && value.length > 0;
                    };

                    const nameMsg = 'Enter a valid name';

                    if (!validateName(field)) {
                        field.classList.add("error");
                        showError(field, nameMsg);
                    } else {
                        field.classList.remove("error");
                        clearError(field);
                    }
                    validateAllFields();
                }, 1000);
            });
        });

        // Function for displaying the error
        function showError(input, message) {
            let errorElement = input.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.classList.add('error-field');
                input.insertAdjacentElement('afterend', errorElement);
            }
            errorElement.textContent = message;
        }

        // Function for clearing an error
        function clearError(input) {
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-field')) {
                errorElement.remove();
            }
        }

        // Initialisation of validation of all fields
        allInputs.forEach((input) => {
            input.addEventListener('input', validateAllFields);
        });

        // Initial check
        validateAllFields();
    }

//ajax submit
    init() {
        this.form = this.querySelector('form')
        if (this.form) {
            this.submit = this.form.querySelector('[type="submit"]')
            this.submit.addEventListener('click', (event) => {
                event.preventDefault()
                this.renderSectionsFromFetch(this.form.action, this.form)
            })
        }
    }

    async renderSectionsFromFetch(url, form) {
        const formData = new FormData(form);
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            let html = await response.text(),
                parser = new window.DOMParser().parseFromString(html, 'text/html'),
                form = parser.getElementById('ContactForm');

            this.innerHTML = form.innerHTML;
            this.init();
        } catch (error) {
            console.error(error.message)
        }
    }
}

window.customElements.define('contact-form', ContactForm)
