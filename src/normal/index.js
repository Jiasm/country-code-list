export default class CodeList {
  constructor ({codes, container, context = window}) {
    this.codes = codes
    this.container = container
    this.context = context

    this.drawList()
    this.initEvent()
  }

  drawList () {
    let {codes, container} = this

    let headerMap = {}
    let shortMenuMap = {}

    let template = `
      <div class="search-wrap">
        <input class="search-input" placeholder="搜索" />
        <div class="search-btn"><i class="search-icon"></i></div>
      </div>
      <div class="list-wrap">
        <ul class="code-list">
          ${codes.map(({shortKey, items}) => `
            <li class="code-group" data-key="${shortKey}">
              <ul class="code-group-list">
                ${items.map(item => `
                  <li class="code-item" data-short="${item.short}">
                    <p class="code-item-area">${item.area}</p>
                    <p class="code-item-code">${item.code}</p>
                  </li>
                `).join('')}
              </ul>
            </li>
          `).join('')}
        </ul>
        <ul class="short-map-menu">
          ${codes.map(({shortKey}) => `
            <li class="short-map-item" data-key="${shortKey}">
              ${shortKey}
            </li>
          `).join('')}
        </ul>
      </div>
    `

    container.innerHTML = template

    let start = container.querySelector('.code-list').offsetTop
    container.querySelectorAll('.code-group').forEach(item => {
      headerMap[start + item.offsetTop] = item.dataset['key']
    })

    this.headerMapKeys = Object.keys(headerMap)
    this.headerMapValues = Object.values(headerMap)

    let menuStart = container.querySelector('.short-map-menu').offsetTop - container.querySelector('.short-map-menu').offsetHeight / 2
    container.querySelectorAll('.short-map-item').forEach(item => {
      shortMenuMap[menuStart + item.offsetTop] = item.dataset['key']
    })

    this.shortMenuMapKeys = Object.keys(shortMenuMap)
    this.shortMenuMapValues = Object.values(shortMenuMap)
  }

  initEvent () {
    let {container, context: {window: win}} = this

    win.addEventListener('scroll', e => {
      let {scrollY} = win
      let cursor = null
      this.headerMapKeys.some((offset, index) => {
        if (scrollY >= offset) {
          cursor = index
        } else {
          return true
        }
      })

      let cursorVal = this.headerMapValues[cursor]
      container.querySelectorAll('.code-group').forEach(({classList}) => classList.contains('cursor') && classList.remove('cursor'))

      if (cursor === null) return

      let $cursor = container.querySelector(`.code-group[data-key=${cursorVal}]`).classList
      !$cursor.contains('cursor') && $cursor.add('cursor')
      // console.log(cursor, this.headerMapValues[cursor])
    })
    container.querySelector('.short-map-menu').addEventListener('touchmove', (e) => {
      let {clientY} = e.touches[0]
      let cursor = null
      this.shortMenuMapKeys.some((offset, index) => {
        if (clientY >= offset) {
          cursor = index
        } else {
          return true
        }
      })

      if (cursor === null) return

      let cursorKey = this.shortMenuMapValues[cursor]
      let index = this.headerMapValues.indexOf(cursorKey)
      if (this.cursorShortIndex !== index) {
        this.cursorShortIndex = index
        let offsetTop = this.headerMapKeys[index]
        window.scrollTo(0, offsetTop)
      }
      e.preventDefault()
    })
  }
}
