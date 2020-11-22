import { TagToken, TopLevelToken } from 'liquidjs'
import { TagImplOptions } from 'liquidjs/dist/template/tag/tag-impl-options'

export const Schema: TagImplOptions = {
  parse: function (tagToken: TagToken, remainTokens: TopLevelToken[]) {
    this.tokens = []
    const stream = this.liquid.parser.parseStream(remainTokens)
    stream
      .on('token', (token: TagToken) => {
        if (token.name === 'endschema') {
          stream.stop()
        } else this.tokens.push(token)
      })
      .on('end', () => {
        throw new Error(`tag ${tagToken.getText()} not closed`)
      })
    stream.start()
  },
  render: function () {
    const json = this.tokens.map((token) => token.getText()).join('')
    const schema = JSON.parse(json)
    console.log('schema:', schema)
    return ''
  }
}
