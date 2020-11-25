import { TagImplOptions, TagToken, TopLevelToken } from 'liquidjs'
import { render } from 'sass'

const quoted = /^'[^']*'|"[^"]*"$/

const processors = {
  '': (x) => x,
  sass: sassProcessor,
  scss: sassProcessor
}

export const StyleSheet: TagImplOptions = {
  parse: function (token: TagToken, remainTokens: TopLevelToken[]) {
    this.processor = token.args

    this.tokens = []
    const stream = this.liquid.parser.parseStream(remainTokens)
    stream
      .on('token', (token: TagToken) => {
        if (token.name === 'endstylesheet') stream.stop()
        else this.tokens.push(token)
      })
      .on('end', () => {
        throw new Error(`tag ${token.getText()} not closed`)
      })
    stream.start()
  },
  render: async function (ctx) {
    let processor = ''
    if (quoted.exec(this.processor)) {
      const template = this.processor.slice(1, -1)
      processor = await this.liquid.parseAndRender(
        template,
        ctx.getAll(),
        ctx.opts
      )
    }

    const text = this.tokens.map((token) => token.getText()).join('')

    const p = processors[processor]
    if (!p) throw new Error(`processor for ${processor} not found`)
    const css = await p(text)
    return `<style>${css}</style>`
  }
}

function sassProcessor (data: string) {
  return new Promise((resolve, reject) =>
    render({ data }, (err, result) =>
      err ? reject(err) : resolve('' + result.css)
    )
  )
}
