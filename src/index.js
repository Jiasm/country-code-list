import codes from './codes'
import CodeList from './normal'

window.addEventListener('load', () => {
  let container = document.querySelector('#container')
  new CodeList({codes, container})
})
