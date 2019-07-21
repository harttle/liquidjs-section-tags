import { render } from 'sass'

const quoted = /^'[^']*'|"[^"]*"$/

const processors = {
  '': x => x,
  'sass': sassProcessor,
  'scss': sassProcessor
}

export const StyleSheet = {
  parse: function (token, remainTokens) {
    this.processor = token.args

    this.tokens = []
    const stream = this.liquid.parser.parseStream(remainTokens)
    stream
      .on('token', (token) => {
        if (token.name === 'endstylesheet') stream.stop()
        else this.tokens.push(token)
      })
      .on('end', () => {
        throw new Error(`tag ${token.raw} not closed`)
      })
    stream.start()
  },
  render: async function (ctx, hash) {
    let processor = ''
    if (quoted.exec(this.processor)) {
      const template = this.processor.slice(1, -1)
      processor = await this.liquid.parseAndRender(template, ctx.getAll(), ctx.opts)
    }

    const text = this.tokens.map((token) => token.raw).join('')

    const p = processors[processor]
    if (!p) throw new Error(`processor for ${processor} not found`)
    const css = await p(text)
    return `<style>${css}</style>`
  }
}

function sassProcessor (data: string) {
  return new Promise((resolve, reject) => render(
    { data },
    (err, result) => err ? reject(err) : resolve('' + result.css))
  )
}
