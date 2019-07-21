import { join } from 'path'

const quoted = /^'[^']*'|"[^"]*"$/

export function sectionTag (root: string) {
  return {
    parse: function (token) {
      this.namestr = token.args
    },
    render: async function (ctx, hash) {
      let name
      if (quoted.exec(this.namestr)) {
        const template = this.namestr.slice(1, -1)
        name = await this.liquid.parseAndRender(template, ctx.getAll(), ctx.opts)
      }
      if (!name) throw new Error(`cannot include with empty filename`)

      const filepath = join(root, name)
      const templates = await this.liquid.getTemplate(filepath)
      return this.liquid.render(templates)
    }
  }
}
