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

    let headerMap = this.headerMap = {}
    let start = container.offsetTop

    let template = `
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
    `

    container.innerHTML = template

    container.querySelectorAll('.code-group').forEach(item => {
      headerMap[start + item.offsetTop] = item.dataset['key']
    })

    this.headerMapKeys = Object.keys(headerMap)
    this.headerMapValues = Object.values(headerMap)
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

      if (cursor === null) return

      let cursorVal = this.headerMapValues[cursor]
      container.querySelectorAll('.code-group').forEach(({classList}) => classList.contains('cursor') && classList.remove('cursor'))

      let $cursor = container.querySelector(`.code-group[data-key=${cursorVal}]`).classList
      !$cursor.contains('cursor') && $cursor.add('cursor')
      // console.log(cursor, this.headerMapValues[cursor])
    })
  }
}
