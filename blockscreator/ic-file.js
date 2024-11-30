import '@/styles/blocks/{name}.scss'

class nameCamel extends window.HTMLElement {
  connectedCallback() {
    console.log('{name} connected')
  }
}

window.customElements.define('{name}', nameCamel)
