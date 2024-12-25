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

const timestamp = document.getElementById('datetime')
if (timestamp) {
  // Get the current date and time
  let lastMinute = new Date().getMinutes() // Initialize with the current minute

  // Set an interval to check every second (1000 milliseconds)
  setInterval(() => {
    const currentMinute = new Date().getMinutes() // Get the current minute

    // Check if the minute has changed
    if (currentMinute !== lastMinute) {
      lastMinute = currentMinute // Update the last checked minute

      updateTime()
    }
  }, 1000) // Check every second

  async function updateTime() {
    const response = await fetch(window.location)
    const html = await response.text()

    const parser = new window.DOMParser().parseFromString(html, 'text/html')

    const datetime = parser.getElementById('datetime')
    timestamp.innerHTML = datetime.innerHTML
  }
}
