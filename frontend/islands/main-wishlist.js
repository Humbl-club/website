import '@/styles/blocks/main-wishlist.scss'

class MainWishlist extends window.HTMLElement {
  connectedCallback() {
    console.log('main-wishlist connected')

    const wishlistPage = document.getElementById('st-wishlist-page')

    if (wishlistPage) {
      this.appendChild(wishlistPage)
      const observer = new window.MutationObserver((mutationRecords) => {
        mutationRecords.forEach((record) => {
          if (record.target === wishlistPage) {
            document.body.classList.toggle(
              'loading',
              record.target.classList.contains('st-wishlist-loading')
            )
          }

          if (record.type === 'childList') {
            record.addedNodes.forEach((el) => {
              if (el.classList.contains('st-product-card')) {
                const form = el.querySelector('form')
                if (form) {
                  const removeBtn = document.createElement('button')
                  const nativeRemove = el.querySelector('.st-delete-button')
                  const block = document.createElement('div')
                  const addBtn = document.createElement('button')
                  addBtn.type = 'submit'
                  addBtn.classList.add('link')
                  addBtn.innerHTML = 'Add to bag'
                  block.classList.add('main-wishlist-bot')
                  removeBtn.classList.add('link')
                  removeBtn.innerHTML = 'Remove'
                  removeBtn.type = 'button'

                  if (nativeRemove) {
                    removeBtn.addEventListener('click', function () {
                      nativeRemove.click()
                    })
                    block.appendChild(removeBtn)
                    form.appendChild(block)
                  }

                  // block.appendChild(addBtn)
                }
              }
            })
          }
          console.log(record)
        })
      })

      observer.observe(wishlistPage, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['class']
      })
    }
  }
}

window.customElements.define('main-wishlist', MainWishlist)
