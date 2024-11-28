export function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: `application/${type}`
    }
  }
}

export function debounce(fn, wait) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, args), wait)
  }
}

export const disableScroll = () => {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth
  document.body.style.paddingRight = scrollBarWidth + 'px'
  document.documentElement.classList.add('disable-scroll')

  if (
    document.documentElement.classList.contains('home-page') &&
    document.documentElement.classList.contains('sticky-header')
  ) {
    const header = document.querySelector('.header')
    if (header) {
      header.style.paddingRight = scrollBarWidth + 'px'
    }
  }
}

export const enableScroll = () => {
  document.body.style.paddingRight = ''
  document.documentElement.classList.remove('disable-scroll')
  const header = document.querySelector('.header')
  if (header) {
    header.style.paddingRight = ''
  }
}
