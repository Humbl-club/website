import { xl } from '@/lib/media'

class MobileModal extends window.HTMLElement {
  connectedCallback() {
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

    xl.addEventListener('change', this.initCardButtons)

    this.initCardButtons()
  }

  initCardButtons() {
    if (xl.matches) {
      const cardsMobile = document.querySelectorAll('.card-cart')
      const mobileModal = document.getElementById('mobile-modal')
      if (mobileModal) {
        cardsMobile.forEach((btn) => {
          if (btn.classList.contains('inited')) {
            return
          }
          btn.addEventListener('click', function () {
            const card = this.closest('.card')
            if (card) {
              mobileModal.openModal()
              mobileModal.innerHTML = card.innerHTML
            }
          })
          btn.classList.add('inited')
        })
        const mobileoverlay = document.getElementById('mobile-modal-overlay')
        mobileoverlay.addEventListener('click', function () {
          this.previousElementSibling.classList.remove('open')
        })
      }
    }
  }

  openModal() {
    this.classList.add('open')
  }

  closeModal() {
    this.classList.remove('open')
  }
}

window.customElements.define('quick-add-modal', MobileModal)
