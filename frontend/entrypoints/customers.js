import 'vite/modulepreload-polyfill'
import('@/lib/shopify_common')
import('@/lib/customer-address')

const links = document.querySelectorAll('.account-aside .account-link')
if (links.length) {
  links.forEach((link) => {
    if (window.location.href === link.href) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }

    const isActive = document.querySelector(
      '.account-aside .account-link.active'
    )

    link.addEventListener('click', function () {
      links.forEach((el) => el.classList.remove('active'))
      this.classList.add('active')
    })

    if (Boolean(isActive) === false) {
      links[0].classList.add('active')
    }
  })
}
