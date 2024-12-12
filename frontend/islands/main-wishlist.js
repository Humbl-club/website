import '@/styles/blocks/main-wishlist.scss'

class MainWishlist extends window.HTMLElement {
  connectedCallback() {
    console.log('main-wishlist connected')

    const mainFavoriteBtn = this.querySelector('.favorite-label')
    const wishlistPage = document.getElementById('st-wishlist-page')

    if (wishlistPage && mainFavoriteBtn) {
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

      observer.observe(wishlistPage, {
        attributes: true,
        attributeFilter: ['class']
      })
    }
  }
}

window.customElements.define('main-wishlist', MainWishlist)
