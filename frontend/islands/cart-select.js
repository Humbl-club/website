class CartSelect extends window.HTMLElement {
  connectedCallback() {
    this.init()
  }

  init() {
    let i, j, ll, selElmnt, a, b, c
    /* Look for any elements with the class "custom-select": */
    const x = this.getElementsByClassName('custom-select')
    const l = x.length
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName('select')[0]
      ll = selElmnt.length
      /* For each element, create a new DIV that will act as the selected item: */
      a = this.querySelector('.select-selected')
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement('DIV')
      b.setAttribute('class', 'select-items select-hide')
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement('DIV')
        c.innerHTML = selElmnt.options[j].innerHTML
        if (
          this?.dataset?.selected &&
          this.dataset.selected.toLowerCase().trim() ===
            selElmnt.options[j].innerHTML.toLowerCase().trim()
        ) {
          selElmnt.options[j].selected = true
          const btn = c
          setTimeout(() => {
            btn.click()
          })
        }
        c.addEventListener('click', function (e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          let y, i, k, yl
          const s = this.parentNode.parentNode.getElementsByTagName('select')[0]
          const sl = s.length
          const h = this.parentNode.previousElementSibling
          this.parentNode.previousElementSibling.classList.add(
            'select-selected--active'
          )
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML === this.innerHTML) {
              s.selectedIndex = i
              h.innerHTML = this.innerHTML
              y = this.parentNode.getElementsByClassName('same-as-selected')
              yl = y.length
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute('class')
              }
              this.setAttribute('class', 'same-as-selected')
              break
            }
          }
          h.click()
        })
        b.appendChild(c)
      }
      x[i].appendChild(b)
      if (!x[i].classList.contains('inited')) {
        a.addEventListener('click', function (e) {
          /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
          e.stopPropagation()
          closeAllSelect(this)

          const rect = this.getBoundingClientRect()
          const dropdownHeight = this.nextElementSibling.offsetHeight
          let drawer = this.closest('cart-drawer-items')
          if (drawer) {
            drawer = drawer.offsetHeight + drawer.getBoundingClientRect().top
          } else {
            drawer = window.innerHeight
          }
          const spaceBelow = drawer - rect.bottom
          // Check if there's enough space below to show the dropdown
          if (spaceBelow < dropdownHeight) {
            // Position dropdown above the button
            this.nextElementSibling.classList.add('--top')
          } else {
            // Position dropdown below the button
            this.nextElementSibling.classList.remove('--top')
          }

          this.nextElementSibling.classList.toggle('select-hide')
          this.classList.toggle('select-arrow-active')
        })
      }

      x[i].classList.add('inited')
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      const arrNo = []
      const x = document.getElementsByClassName('select-items')
      const y = document.getElementsByClassName('select-selected')
      const xl = x.length
      const yl = y.length
      for (let i = 0; i < yl; i++) {
        if (elmnt === y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove('select-arrow-active')
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add('select-hide')
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener('click', closeAllSelect)
  }
}

window.customElements.define('cart-select', CartSelect)
