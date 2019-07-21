export const JavaScript = {
  parse: function (token, remainTokens) {
    this.tokens = []
    const stream = this.liquid.parser.parseStream(remainTokens)
    stream
      .on('token', (token) => {
        if (token.name === 'endjavascript') stream.stop()
        else this.tokens.push(token)
      })
      .on('end', () => {
        throw new Error(`tag ${token.raw} not closed`)
      })
    stream.start()
  },
  render: async function (ctx, hash) {
    const text = this.tokens.map((token) => token.raw).join('')
    return `<script>${text}</script>`
  }
}
