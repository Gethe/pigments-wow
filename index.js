'use babel'

let int = '\\d+'
let decimal = '\\.' + int
let float = '(?:' + int + decimal + '|' + int + '|' + decimal + ')'

let quote = '[\'"]'
let comma = '\\s*,\\s*'
let commaMaybe = '\\s*,?\\s*'
let ps = '\\(\\s*'
let pe = '\\s*\\)'

// decimalColorArgs = \(\s*((?:\d+\.\d+|\d+|\.\d+))\s*,\s*((?:\d+\.\d+|\d+|\.\d+))\s*,\s*((?:\d+\.\d+|\d+|\.\d+))\s*,\s*((?:\d+\.\d+|\d+|\.\d+))\s*\)
let decimalColorArgs = ps +
  '(' + float + ')' +
  comma +
  '(' + float + ')' +
  comma +
  '(' + float + ')' +
  commaMaybe +
  '(' + float + ')?' +
pe

function decimalColorHandler (match, expression, context) {
  console.log(this, match, expression)
  this.red = context.readFloat(match[1]) * 255
  this.green = context.readFloat(match[2]) * 255
  this.blue = context.readFloat(match[3]) * 255

  let alpha = match[4] == null ? 1 : match[4]
  this.alpha = context.readFloat(alpha)
}

let decimalColorFunctions = {
  // color object methods
  create_color: 'CreateColor',
  set_rgb: 'SetRGB',
  set_rgba: 'SetRGBA',

  // frame methods
  set_backdrop_color: 'SetBackdropColor',
  set_backdrop_border_color: 'SetBackdropBorderColor',

  // texture methods
  set_color_texture: 'SetColorTexture',
  set_vertex_color: 'SetVertexColor',

  // font methods
  set_text_color: 'SetTextColor'
}

let expressions = []

for (let func in decimalColorFunctions) {
  console.log(func, decimalColorFunctions[func])
  expressions.push({
    name: 'wow:' + func,
    regexpString: decimalColorFunctions[func] + decimalColorArgs,
    scopes: ['lua'],
    handle: decimalColorHandler
  })
}

let escS = '\\|c'
let escE = '\\|r'

let strS = '(?:' + quote + '|' + escS + ')?'
let strE = '(?:(?=' + escS + ')|' + escE + '|' + quote + ')?'

expressions.push({
  name: 'wow:argb_string',
  regexpString: strS + '([\\da-fA-F]{8})[\\%\\s\\w]*' + strE,
  scopes: ['lua'],
  handle: function (match, expression, context) {
    console.log(this, match, expression)
    this.hexARGB = match[1]
  }
})

export default {

  provideColorExpressions: () => {
    console.log('provideColorExpressions')
    return {expressions}
  },

  activate (state) {
    console.log('PigmentsWow was activated!')
  },

  deactivate () {
    console.log('PigmentsWow was deactivated!')
  }
}
