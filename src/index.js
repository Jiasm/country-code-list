import codes from './codes'
import CodeList from './normal'
import './normal/index.scss'

window.addEventListener('load', () => {
  let container = document.querySelector('#container')
  new CodeList({codes, container})
})
