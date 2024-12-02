import { disableScroll, enableScroll } from '@/lib/utils'
import '@/styles/blocks/menu-drawer.scss'

class MenuDrawer extends window.HTMLElement {
  inited = false

  connectedCallback() {
    this.init()
  }

  init() {
    this.modal = this.querySelector('.modal')
    this.overlay = this.querySelector('.modal-overlay')
    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.closeModal()
      })
    }

    this.inited = true
    if (this.isModalOpened()) {
      this.openModal()
    }

    this.closeBtns = this.querySelectorAll('.modal-close')
    if (this.closeBtns) {
      this.closeBtns.forEach((btn) => {
        btn.addEventListener('click', this.closeModal.bind(this))
      })
    }
  }

  static get observedAttributes() {
    return ['data-open']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-open' && this.inited) {
      if (oldValue !== newValue && newValue === 'true') {
        this.openModal()
      } else {
        this.closeModal()
      }
    }
  }

  isModalOpened() {
    return this.dataset.open === 'true'
  }

  openModal() {
    disableScroll()
    setTimeout(() => {
      this.open()
      this.unHideOverlay()
    })
  }

  closeModal() {
    if (this.isModalOpened()) {
      enableScroll()
      this.modal.addEventListener(
        'transitionend',
        () => {
          this.close()
        },
        { once: true }
      )
      this.modal.classList.remove('open')
      this.hideOverlay()
    }
  }

  open() {
    this.modal.classList.add('open')
    if (this.dataset.open === 'false') {
      this.dataset.open = 'true'
    }
  }

  close() {
    if (this.dataset.open === 'true') {
      this.dataset.open = 'false'
    }
  }

  hideOverlay() {
    this.overlay.classList.add('add-opacity')
  }

  unHideOverlay() {
    this.overlay.classList.remove('add-opacity')
  }
}

window.customElements.define('menu-drawer', MenuDrawer)
