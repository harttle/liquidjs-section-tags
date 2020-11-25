import { expect } from 'chai'
import { Liquid } from 'liquidjs'
import { resolve } from 'path'
import { liquidSectionTags } from '../src/index'

describe('section', function () {
  let liquid: Liquid

  before(function () {
    liquid = new Liquid({
      extname: '.liquid',
      root: [resolve(__dirname, './stub/sections')]
    })
    liquid.plugin(liquidSectionTags())
  })

  it('should render section', async () => {
    const html = await liquid.parseAndRender('B{% section "foo" %}A')
    expect(html).to.equal('BFOOA')
  })
})
