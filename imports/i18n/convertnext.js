var yaml = require('js-yaml')
var fs = require('fs')
var util = require('util')

var args = process.argv.slice(2)
var lang = args[0]
var soloFile = args[1]

var from = './both/i18n/' + lang
var to = './imports/i18n/' + lang

if (soloFile) {
  convertFile(soloFile)
} else {
  var files = fs.readdirSync(from)
  fs.mkdirSync(to)
  files.forEach(convertFile)
}

function convertFile (file) {
  try {
    var content = fs.readFileSync(from + '/' + file, 'utf8')
      .replace(/%s/g, 'xxx')
      .replace(/__date__/g, '{{date}}')
      .replace(/__time__/g, '{{time}}')
      .replace(/__team__/g, '{{team}}')
      .replace(/__count__/g, '{{count}}')
      .replace(/__attr1__/g, '{{attr1}}')
      .replace(/__attr2__/g, '{{attr2}}')

    var obj = yaml.safeLoad(content, {
      json: true
    })
    var name = Object.keys(obj)[0]
    var text = 'const ' + name + ' = ' + util.inspect(obj[name], { compact: false, depth: null }) + '\n\nexport default ' + name + '\n'
    fs.writeFileSync(to + '/' + file.replace(lang + '.i18n.yml', 'js'), text)
  } catch (e) {
    console.log('error in ' + file)
    throw e
  }
}
