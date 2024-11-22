class QuantityInput extends window.HTMLElement {
  constructor() {
    super()
    this.input = this.querySelector('input')
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', this.onButtonClick.bind(this))
    )
    this.querySelector('input').addEventListener(
      'input',
      this.onInput.bind(this)
    )
  }

  onButtonClick(event) {
    event.preventDefault()
    const previousValue = this.input.value

    event.currentTarget.name === 'plus'
      ? this.input.stepUp()
      : this.input.stepDown()
    if (previousValue !== this.input.value)
      this.input.dispatchEvent(this.changeEvent)
  }

  onInput(event) {
    if (event.target.value > event.target.max) {
      event.target.value = event.target.max
    }
  }
}

window.customElements.define('quantity-input', QuantityInput)
