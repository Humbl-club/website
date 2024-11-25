import 'vite/modulepreload-polyfill'
import { initDisclosureWidgets } from '@/lib/a11y'
import { revive, islands } from '@/lib/revive.js'

const timestamp = document.getElementById('timestamp')
if (timestamp) {
  function updateDateTime() {
    console.log(new Date(timestamp.innerHTML))
    console.log(new Date())
    const now = new Date()
    const formattedDate = formatDate(now)
    document.getElementById('datetime').innerText = formattedDate
  }

  function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  // Update the date and time initially
  updateDateTime()

  // Set interval to update every second
  setInterval(updateDateTime, 1000)
}

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
