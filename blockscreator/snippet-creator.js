import { createTemplateFiles } from './createLib.js'
const neededFiles = [
  {
    location: (arg) => `/${arg}.liquid`,
    content: 'snc-file.liquid',
    dir: `snippets/`
  }
]

const args = process.argv.slice(2)
if (args.length) {
  args.forEach((arg) => {
    createTemplateFiles(neededFiles, arg)

    console.log(`📗 Snippet ${arg} created successfully!`)
  })
}
