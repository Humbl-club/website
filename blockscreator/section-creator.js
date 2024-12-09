import { createTemplateFiles } from './createLib.js'
const neededFiles = [
  {
    location: (arg) => `/${arg}.liquid`,
    content: process?.env?.npm_config_style
      ? 'sc-file-styles.liquid'
      : 'sc-file.liquid',
    dir: `sections/`
  }
]

if (process?.env?.npm_config_style) {
  neededFiles.push({
    location: (arg) => `/${arg}.scss`,
    content: 'sc-file-styles.scss',
    dir: `frontend/entrypoints/`
  })
}

const args = process.argv.slice(2)

if (args.length) {
  args.forEach((arg) => {
    createTemplateFiles(neededFiles, arg)

    console.log(`📗 Block ${arg} created successfully!`)
  })
}
