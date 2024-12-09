import 'vite/modulepreload-polyfill'
import { initDisclosureWidgets } from '@/lib/a11y'
import { revive, islands } from '@/lib/revive.js'

const summaries = document.querySelectorAll('[id^="Details-"] summary')
revive(islands)
initDisclosureWidgets(summaries)

const drawerbtn = document.querySelector('.header-cart.drawer')
if (drawerbtn) {
  drawerbtn.addEventListener('click', function (event) {
    if (window.openCartDrawer) {
      event.preventDefault()
      window.openCartDrawer()
    }
  })
}

document.addEventListener('click', modalHandler)
function modalHandler(event) {
  const btn = event.target.closest('[data-modal]')
  if (btn) {
    const modal = document.getElementById(btn.dataset.modal)
    if (modal) {
      if (modal.dataset.open === 'true') {
        modal.dataset.open = 'false'
      } else {
        modal.dataset.open = 'true'
      }
    }
  }
}
