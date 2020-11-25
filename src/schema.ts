import { TagToken, TopLevelToken } from 'liquidjs'
import { TagImplOptions } from 'liquidjs/dist/template/tag/tag-impl-options'

function generateSettingsObj (settings: any) {
  if (!Array.isArray(settings)) {
    return settings
  }

  return settings
    .filter((entry) => !!entry.id)
    .reduce((sectionSettings, entry) => {
      sectionSettings[entry.id] = entry.default
      return sectionSettings
    }, {})
}

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
  render: function (ctx) {
    const json = this.tokens.map((token) => token.getText()).join('')
    const schema = JSON.parse(json)

    const scope = (ctx as any).scopes[(ctx as any).scopes.length - 1]
    scope.section = {
      settings: generateSettingsObj(schema.settings),
      blocks: (schema.blocks || []).map((block) => ({
        ...block,
        settings: generateSettingsObj(block.settings)
      }))
    }

    return ''
  }
}
