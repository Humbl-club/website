import * as fs from 'fs'

export const createTemplateFiles = (neededFiles, arg) => {
  neededFiles.forEach((file) => {
    const location = file.dir + file.location(arg)
    let content = ''

    if (file?.content) {
      fs.readFile('blockscreator/' + file.content, 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        if (file?.camelCase) {
          content = data.replace(/nameCamel/gm, snakeToCamel(arg))
          content = content.replace(/{name}/gm, arg)
        } else {
          content = data.replace(/{name}/gm, arg)
        }

        fs.writeFile(location, content, errorHandler)
      })
    } else {
      fs.writeFile(location, '', errorHandler)
    }
  })
}

function snakeToCamel(str) {
  return (
    str.slice(0, 1).toUpperCase() +
    str
      .slice(1)
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )
  )
}

function errorHandler(err) {
  if (err) throw err
}
