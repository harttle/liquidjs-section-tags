import Liquid from 'liquidjs'
import { expect } from 'chai'
import { liquidSectionTags } from '../src/index'
import { resolve } from 'path'

describe('javascript', function () {
  let liquid: Liquid
  before(function () {
    liquid = new Liquid({ extname: '.liquid' })
    liquid.plugin(liquidSectionTags({
      root: resolve(__dirname, './stub/sections')
    }))
  })
  it('should load javascript', async () => {
    const html = await liquid.parseAndRender('{% section "js" %}')
    expect(html).to.equal('<script>\nconsole.log("foo")\n</script>')
  })
})
