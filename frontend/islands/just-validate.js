import JustValidate from 'just-validate'
import JustValidatePluginDate from 'just-validate-plugin-date'

class ValidateIsland extends window.HTMLElement {
  constructor() {
    super()

    this.options = {
      errorLabelStyle: {
        color: 'red'
      },
      errorLabelCssClass: ['error-text'],
      errorFieldCssClass: ['error'],
      validateBeforeSubmitting: true,
      errorsContainer: '#errors-container_custom-name'
    }

    this.validate = new JustValidate(this.querySelector('form'), this.options)
  }

  connectedCallback() {
    const checkboxes = this.querySelectorAll('input[type="checkbox"][required]')
    if (checkboxes.length) {
      checkboxes.forEach((checkbox) => {
        this.validate.addField(checkbox, [
          {
            rule: 'required'
          }
        ])
      })
    }

    const password = this.querySelector('.validation-password')
    if (password) {
      this.validate.addField(password, [
        {
          rule: 'password'
        },
        {
          rule: 'required'
        }
      ])
    }

    const redEmail = this.querySelector('.email-required')
    if (redEmail) {
      this.validate.addField(redEmail, [
        {
          rule: 'email'
        },
        {
          rule: 'required'
        }
      ])
    }

    const date = this.querySelector('.date-validation')

    if (date) {
      this.validate.addField(date, [
        {
          plugin: JustValidatePluginDate(() => ({
            format: 'dd/MM/yyyy'
          })),
          errorMessage: 'Date should be in dd/MM/yyyy format'
        }
      ])
    }

    const requiredTexts = this.querySelectorAll('.required-text')
    if (requiredTexts.length) {
      requiredTexts.forEach((el) => {
        this.validate.addField(el, [
          {
            rule: 'required'
          },
          {
            rule: 'minLength',
            value: 3
          },
          {
            rule: 'maxLength',
            value: 50
          }
        ])
      })
    }
  }
}

window.customElements.define('just-validate', ValidateIsland)
