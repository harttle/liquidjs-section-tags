import { Liquid } from 'liquidjs'
import { expect } from 'chai'
import { liquidSectionTags } from '../src/index'
import { resolve } from 'path'

describe('section', function () {
  let liquid: Liquid

  before(function () {
    liquid = new Liquid({ extname: '.liquid' })
    liquid.plugin(liquidSectionTags({
      root: resolve(__dirname, './stub/sections')
    }))
  })

  it('should render section', async () => {
    const html = await liquid.parseAndRender('B{% section "foo" %}A')
    expect(html).to.equal('BFOOA')
  })
})
