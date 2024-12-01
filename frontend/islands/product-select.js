class ProductSelect extends window.HTMLElement {
  connectedCallback() {
    this.init()

    document.addEventListener('click', this.closeAllSelects)
  }

  init() {
    this.dropdown = this.querySelector('.product-dropdown')
    this.selected = this.querySelector('.product-selected')
    if (this.selected && this.dropdown) {
      this.selected.addEventListener('click', (event) => {
        event.stopPropagation()
        this.closeAllSelects(this)
        this.classList.toggle('active')
      })

      this.mobileText = this.selected.querySelector('.product-select-mobile')

      this.dropdownlist = this.dropdown.querySelectorAll('.product-select-item')
      if (this.dropdownlist.length) {
        this.dropdownlist.forEach((el) => {
          el.addEventListener('click', () => {
            this.dropdownlist.forEach((item) => {
              item.classList.remove('same-as-selected')
            })
            el.classList.add('same-as-selected')
            this.mobileText.innerText = el.innerText
          })
        })
      }
    }
  }

  closeAllSelects(current) {
    const allSelects = document.querySelectorAll('product-select')
    if (allSelects.length) {
      allSelects.forEach((el) => {
        if (el !== current) {
          el.classList.remove('active')
        }
      })
    }
  }
}

window.customElements.define('product-select', ProductSelect)
