import { createTemplateFiles } from './createLib.js'
const neededFiles = [
  {
    location: (arg) => `/${arg}.js`,
    content: 'ic-file.js',
    dir: `frontend/islands/`,
    camelCase: true
  },
  {
    location: (arg) => `/${arg}.scss`,
    content: 'ic-file.scss',
    dir: `frontend/styles/blocks/`
  }
]

const args = process.argv.slice(2)
if (args.length) {
  args.forEach((arg) => {
    createTemplateFiles(neededFiles, arg)

    console.log(`📗 Island ${arg} created successfully!`)
  })
}
