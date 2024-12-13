import '@/styles/blocks/contact-form.scss'

class ContactForm extends window.HTMLElement {
    connectedCallback() {
        this.init()

        //email validation
        let emailInput = this.querySelector('#ContactForm-email'),
            errorElement = this.querySelector("#errorField"),
            btnSubmit = this.querySelector('button[type="submit"]');

        emailInput.addEventListener('input', (event) => {
            setTimeout(function () {
                let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    emailMsg = 'Enter a valid email',
                    emailValue = emailInput.value.trim();

                if (!emailRegex.test(emailValue)) {
                    emailInput.classList.add("error");
                    errorElement.innerHTML = emailMsg;
                    btnSubmit.setAttribute('disabled', 'true');

                } else {
                    if (emailInput.classList.contains('error')) {
                        emailInput.classList.remove("error");
                    }

                    btnSubmit.removeAttribute('disabled');
                    errorElement.innerHTML = "";
                }
            }, 1000)
        });


        //names validation
        let nameFields = this.querySelectorAll('.names');

        nameFields.forEach(function (field) {
            field.addEventListener('input', function (event) {
                let firstNameInput = document.querySelector('#ContactForm-first-name'),
                    lastNameInput = document.querySelector('#ContactForm-last-name'),
                    errorElement = document.querySelector("#errorField");

                setTimeout(function () {
                    function validateField(input) {
                        let value = input.value.trim();
                        if (/^\d+$/.test(value)) return false;
                        return value.length > 0;
                    }

                    let firstNameValid = validateField(firstNameInput),
                        lastNameValid = validateField(lastNameInput),
                        nameMsg = 'The name field must be filled in and must not contain spaces and numbers only';

                    if (!firstNameValid) {
                        errorElement.innerHTML = nameMsg;
                        addError(firstNameInput);
                    } else {
                        removeError(firstNameInput);
                    }

                    if (!lastNameValid) {
                        errorElement.innerHTML = nameMsg;
                        addError(lastNameInput);
                    } else {
                        removeError(lastNameInput);
                    }

                    function addError(field) {
                        field.classList.add('error');
                        btnSubmit.setAttribute('disabled', 'true');
                    }

                    function removeError(field) {
                        field.classList.remove('error');
                        errorElement.innerHTML = '';
                        btnSubmit.removeAttribute('disabled');
                    }
                }, 1000)
            });
        })
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
