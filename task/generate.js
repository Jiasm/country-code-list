// data from https://developers.facebook.com/docs/accountkit/countrycodes/

const fs = require('fs')
const path = require('path')

const short = 'short'

let folder = fs.readdirSync(path.resolve(__dirname, './data'))

folder.forEach(fileName => {
  let filePath = path.resolve(__dirname, './data', fileName)
  let outputPath = path.resolve(__dirname, '../src/codes', fileName)
  let fileData = require(filePath)

  fileData = generateData(fileData)

  fs.writeFileSync(outputPath, JSON.stringify(fileData))
  console.log(`${filePath} => ${outputPath} complete`)
})

/**
 * 将数组数据按照字母分组排序
 * @return {Object} {A: [], B: [], ...}
 * @api    private
 */
function generateData (data) {
  let result = []
  data.forEach(item => {
    let shortKey = item[short][0]
    let items = result[shortKey] = result[shortKey] || []

    items.push(item)
  })

  // console.log(Object.values(Object.entries(result).sort(([a], [b]) => a.charCodeAt() - b.charCodeAt())).map(([item]) => item));
  Object.entries(result).sort(([a], [b]) => a.charCodeAt() - b.charCodeAt()).forEach(([shortKey, items]) => {

    // fix JSON.stringify bug
    result.push({
      shortKey,
      items: items.sort((a, b) => a[short].slice(1).charCodeAt() - b[short].slice(1).charCodeAt())
    })
  })

  return result
}
