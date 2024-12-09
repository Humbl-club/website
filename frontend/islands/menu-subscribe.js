import '@/styles/blocks/menu-subscribe.scss'

class MenuSubscribe extends window.HTMLElement {
  connectedCallback() {
    this.init()
  }

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
    const formData = new FormData(form)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const html = await response.text()

      const parser = new window.DOMParser().parseFromString(html, 'text/html')

      const form = parser.getElementById('menu-subscribe')
      this.innerHTML = form.innerHTML
      this.init()
    } catch (error) {
      console.error(error.message)
    }
  }
}

window.customElements.define('menu-subscribe', MenuSubscribe)
