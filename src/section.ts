import { TagImplOptions } from 'liquidjs'
import { join } from 'path'

const quoted = /^'[^']*'|"[^"]*"$/

export function sectionTag (root: string): TagImplOptions {
  return {
    parse: function (token) {
      this.namestr = token.args
    },
    render: async function (ctx) {
      let name
      if (quoted.exec(this.namestr)) {
        const template = this.namestr.slice(1, -1)
        name = await this.liquid.parseAndRender(
          template,
          ctx.getAll(),
          ctx.opts
        )
      }
      if (!name) throw new Error('cannot include with empty filename')

      const filepath = join(root, name)
      return await this.liquid.renderFile(filepath)
    }
  }
}
