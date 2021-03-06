import {MDCRipple} from '@material/ripple'
import {MDCSimpleMenu} from '@material/menu'
import offset from 'document-offset'

const mainContentDOM = document.querySelector('.main-container')
const mainContentTop = offset(mainContentDOM).top

const appBarDOM = document.querySelector('.app-bar')
const appBarHeight = appBarDOM.clientHeight

let isOpaque = false

const checkAndMakeOpaque = () => {
  const shouldBeOpaque = window.scrollY > mainContentTop - appBarHeight
  if (shouldBeOpaque && !isOpaque) {
    window.requestAnimationFrame(() => {
      appBarDOM.classList.add('app-bar_opaque')
      isOpaque = true
    })
  }

  if (!shouldBeOpaque && isOpaque) {
    window.requestAnimationFrame(() => {
      appBarDOM.classList.remove('app-bar_opaque')
      isOpaque = false
    })
  }
}

const initAppBarOpacity = () => {
  window.addEventListener('scroll', checkAndMakeOpaque)
}

const initDropdown = () => {
  const buttonEl = document.querySelector('.app-bar__mobile-button')
  const menuEl = document.querySelector('.app-bar__mobile-menu')
  MDCRipple.attachTo(buttonEl)

  const menu = new MDCSimpleMenu(menuEl)
  buttonEl.addEventListener('click', () => {
    menu.open = !menu.open
  })
  menuEl.addEventListener('MDCSimpleMenu:selected', (evt) => {
    const urlToGo = evt.detail.item.getAttribute('data-href')
    window.location = urlToGo
  })
}

export {initAppBarOpacity, initDropdown}
