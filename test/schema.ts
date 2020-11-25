import { expect } from 'chai'
import { Liquid } from 'liquidjs'
import { resolve } from 'path'
import { liquidSectionTags } from '../src/index'

describe('schema', function () {
  let liquid: Liquid

  before(function () {
    liquid = new Liquid({
      extname: '.liquid',
      root: [resolve(__dirname, './stub/sections')]
    })
    liquid.plugin(liquidSectionTags())
  })

  it('should allow empty schema', async () => {
    const html = await liquid.parseAndRender('{% section "empty-schema" %}')
    expect(html).to.equal('BA')
  })

  it('should expose section schema settings in the scope', async () => {
    const html = await liquid.parseAndRender('{% section "schema-settings" %}')
    expect(html.trim()).to.equal('Menu 1, menu_enabled:true')
  })

  it('should expose section schema blocks in the scope', async () => {
    const html = await liquid.parseAndRender('{% section "schema-blocks" %}')
    expect(html.trim()).to.equal('quote, text, Once upon a time...')
  })
})
