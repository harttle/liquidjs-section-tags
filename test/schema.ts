import Liquid from 'liquidjs'
import { expect } from 'chai'
import { liquidSectionTags } from '../src/index'
import { resolve } from 'path'

describe('schema', function () {
  let liquid: Liquid
  before(function () {
    liquid = new Liquid({ extname: '.liquid' })
    liquid.plugin(liquidSectionTags({
      root: resolve(__dirname, './stub/sections')
    }))
  })
  it('should allow empty schema', async () => {
    const html = await liquid.parseAndRender('{% section "empty-schema" %}')
    expect(html).to.equal('BA')
  })
})
