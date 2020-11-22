import { TagToken, TopLevelToken } from 'liquidjs'
import { TagImplOptions } from 'liquidjs/dist/template/tag/tag-impl-options'

export const JavaScript: TagImplOptions = {
  parse: function (tagToken: TagToken, remainTokens: TopLevelToken[]): void {
    this.tokens = []
    const stream = this.liquid.parser.parseStream(remainTokens)
    stream
      .on('token', (token: TagToken) => {
        if (token.name === 'endjavascript') stream.stop()
        else this.tokens.push(token)
      })
      .on('end', () => {
        throw new Error(`tag ${tagToken.getText()} not closed`)
      })
    stream.start()
  },
  render: function (): string {
    const text = this.tokens.map((token) => token.getText()).join('')

    return `<script>${text}</script>`
  }
}
