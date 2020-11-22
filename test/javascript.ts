import { expect } from 'chai'
import { Liquid } from 'liquidjs'
import { resolve } from 'path'
import { liquidSectionTags } from '../src/index'

describe('javascript', function () {
  let liquid: Liquid
  before(function () {
    liquid = new Liquid({ extname: '.liquid' })
    liquid.plugin(
      liquidSectionTags({
        root: resolve(__dirname, './stub/sections')
      })
    )
  })

  it('should load javascript', async () => {
    const html = await liquid.parseAndRender('{% section "js" %}')
    expect(html).to.equal('<script>\nconsole.log("foo")\n</script>')
  })
})
