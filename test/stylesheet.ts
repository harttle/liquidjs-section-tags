import Liquid from 'liquidjs'
import { expect } from 'chai'
import { liquidSectionTags } from '../src/index'
import { resolve } from 'path'

describe('stylesheet', function () {
  let liquid: Liquid
  before(function () {
    liquid = new Liquid({ extname: '.liquid' })
    liquid.plugin(liquidSectionTags({
      root: resolve(__dirname, './stub/sections')
    }))
  })
  it('should load plain css', async () => {
    const html = await liquid.parseAndRender('{% section "css" %}')
    expect(html).to.equal('<style>\n.foo .bar {\n  text: center;\n}\n</style>')
  })
  it('should compile scss', async () => {
    const html = await liquid.parseAndRender('{% section "scss" %}')
    expect(html).to.equal('<style>.foo .bar {\n  text: center;\n}</style>')
  })
})
