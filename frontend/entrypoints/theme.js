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
