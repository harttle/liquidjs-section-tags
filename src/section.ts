import { Context, TagImplOptions } from 'liquidjs'

const quoted = /^'[^']*'|"[^"]*"$/

export const Section: TagImplOptions = {
  parse: function (token) {
    this.namestr = token.args
  },
  render: function * (ctx: Context, emitter) {
    let name
    if (quoted.exec(this.namestr)) {
      const template = this.namestr.slice(1, -1)
      name = yield this.liquid._parseAndRender(template, ctx.getAll(), ctx.opts)
    }
    if (!name) throw new Error('cannot include with empty filename')
    const templates = yield this.liquid._parseFile(name, ctx.opts, ctx.sync)

    // Bubble up schema tag for allowing it's data available to the section
    templates.sort((tagA) => {
      return tagA.token.kind === 4 &&
      (tagA.token as any).name === 'schema'
        ? -1
        : 0
    })

    const scope = {}
    ctx.push(scope)
    yield this.liquid.renderer.renderTemplates(templates, ctx, emitter)
    ctx.pop()
  }
}
