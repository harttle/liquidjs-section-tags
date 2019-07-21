export const Schema = {
  parse: function (tagToken, remainTokens) {
    this.tokens = []
    const stream = this.liquid.parser.parseStream(remainTokens)
    stream
      .on('token', (token) => {
        if (token.name === 'endschema') stream.stop()
        else this.tokens.push(token)
      })
      .on('end', () => {
        throw new Error(`tag ${tagToken.raw} not closed`)
      })
    stream.start()
  },
  render: function () {
    const json = this.tokens.map((token) => token.raw).join('')
    const schema = JSON.parse(json)
    console.log('schema:', schema)
    return ''
  }
}
