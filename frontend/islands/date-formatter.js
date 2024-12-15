import '@/styles/blocks/date-formatter.scss'

class DateFormatter extends window.HTMLElement {
  connectedCallback() {
    const $this = this

    this.hiddenInput = this.querySelector('input[type="date"]')
    this.dateInput = this.querySelector('.date-validation')
    if (this.hiddenInput && this.dateInput) {
      this.dateInput.addEventListener('input', this.formatText.bind(this))
      this.dateInput.addEventListener('focus', this.formatText.bind(this))
      this.dateInput.addEventListener('blur', this.formatText.bind(this))
      this.dateInput.addEventListener('keydown', this.formatText.bind(this))
      const event = new Event('blur')
      this.dateInput.dispatchEvent(event)
    }

    function addMask() {
      ;[].forEach.call(
        $this.querySelectorAll('.date-validation'),
        function (input) {
          let keyCode
          function mask(event) {
            event.keyCode && (keyCode = event.keyCode)
            const pos = this.selectionStart
            if (pos < 0) event.preventDefault()
            const matrix = '__/__/____'
            let i = 0
            const def = matrix.replace(/\D/g, '')
            const val = this.value.replace(/\D/g, '')
            let newValue = matrix.replace(/[_\d]/g, function (a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            })
            i = newValue.indexOf('_')
            if (i !== -1) {
              i < 0 && (i = 0)
              newValue = newValue.slice(0, i)
            }
            let reg = matrix
              .substring(0, this.value.length)
              .replace(/_+/g, function (a) {
                return '\\d{0,' + a.length + '}'
              })
              .replace(/[+()]/g, '\\$&')
            reg = new RegExp('^' + reg + '$')
            this.parentElement.classList.remove('error')
            if (
              !reg.test(this.value) ||
              this.value.length < 0 ||
              (keyCode > 47 && keyCode < 58)
            ) {
              this.value = newValue
            }
            if (event.type === 'blur' && this.value.length < 0) this.value = ''
            if (event.type === 'blur' && this.value.length >= matrix.length) {
              this.value = this.value.slice(0, matrix.length)
              const validator = this.closest('just-validate')
              if (validator && validator.validate) {
                validator.validate.revalidate()
              }
            }
          }

          input.addEventListener('input', mask, false)
          input.addEventListener('focus', mask, false)
          input.addEventListener('blur', mask, false)
          input.addEventListener('keydown', mask, false)
        }
      )
    }
    addMask()
  }

  formatText(event) {
    const values = event.target.value.split('/')
    if (values.length === 3) {
      let year = '2000'
      switch (values[2].length) {
        case 0:
          year = `2000`
          break
        case 1:
          year = `200${values[2]}`
          break
        case 2:
          year = `20${values[2]}`
          break
        case 3:
          year = `2${values[2]}`
          break
        default:
          year = values[2]
          break
      }
      if (year[0] === '0') {
        year = '2' + year.slice(1)
      }
      const month = values[1]
      const day = values[0]

      const formattedDate = `${year}-${month}-${day}`

      this.hiddenInput.value = formattedDate
    }
  }

  isDateValid(dateStr) {
    return !isNaN(new Date(dateStr))
  }
}

window.customElements.define('date-formatter', DateFormatter)
