class CollectionEndlesspoint extends window.HTMLElement {
  connectedCallback() {
    this.init()
  }

  init() {
    this.url = new URL(window.location.href)
    this.page = window.page = Number(
      document.getElementById('current-page').innerText || 1
    )
    this.allPages = Number(document.getElementById('all-pages').innerText || 1)

    this.sendFetch()
  }

  initIntersection() {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.sendFetch()
          observer.unobserve(entry.target)
        }
      })
    }

    const options = {
      // root: по умолчанию window,
      // но можно задать любой элемент-контейнер
      rootMargin: '0px 0px 75px 0px',
      threshold: 0
    }

    const observer = new window.IntersectionObserver(callback, options)

    observer.observe(this)
  }

  sendFetch() {
    this.url.searchParams.set('page', ++window.page)
    this.page = window.page
    fetch(this.url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = responseText

        const parser = new window.DOMParser().parseFromString(html, 'text/html')

        const currentPage = Number(
          parser.getElementById('current-page').innerText || 1
        )
        const allPages = Number(
          parser.getElementById('all-pages').innerText || 1
        )

        if (currentPage <= allPages) {
          const cards = parser
            .getElementById(this.getContainer())
            .querySelectorAll(this.getItem())
          const fragment = new window.DocumentFragment()

          const productgrid = document.getElementById(this.getContainer())

          if (cards.length) {
            cards.forEach((el) => {
              fragment.appendChild(el)
            })

            productgrid.appendChild(fragment)

            window.page = currentPage
            this.page = currentPage
            this.allPages = allPages

            this.initIntersection()
          }
        }
      })
  }

  getContainer() {
    return this.dataset.container || 'product-grid'
  }

  getItem() {
    return this.dataset.item || '.grid__item'
  }
}

window.customElements.define('collection-endlesspoint', CollectionEndlesspoint)
