class MobileModal extends window.HTMLElement {
  constructor() {
    super()

    this.init()
  }

  init() {
    document.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('card-sizebtn') &&
        event.target.classList.contains('available')
      ) {
        const card = event.target.closest('.card, #mobile-modal')
        if (card) {
          const input = card.querySelector('input[name="id"]')
          if (input) {
            input.value = event.target.dataset.variantid
            const form = input.closest('form')
            if (form) {
              const submit = form.querySelector('[type="submit"]')
              if (submit) {
                submit.click()
              }
            }
          }
        }
      }
    })
  }

  openModal() {
    this.classList.add('open')
  }

  closeModal() {
    this.classList.remove('open')
  }
}

window.customElements.define('quick-add-modal', MobileModal)
