class CardFavorite extends window.HTMLElement {
  connectedCallback() {
    const mainFavoriteBtn = this.querySelector('.favorite-label')
    const favoriteBtn = this.querySelector('.st-wishlist-button')

    if (favoriteBtn && mainFavoriteBtn) {
      const observer = new window.MutationObserver((mutationRecords) => {
        mutationRecords.forEach((record) => {
          mainFavoriteBtn.classList.toggle(
            'active',
            record.target.classList.contains('st-is-added')
          )

          document.body.classList.toggle(
            'loading',
            record.target.classList.contains('st-is-loading')
          )
        })
      })

      observer.observe(favoriteBtn, {
        attributes: true,
        attributeFilter: ['class']
      })

      mainFavoriteBtn.addEventListener('click', function () {
        favoriteBtn.click()
      })
    }
  }
}

window.customElements.define('card-favorite', CardFavorite)
