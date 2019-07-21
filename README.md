# liquidjs-section-tags (WIP)
liquidjs plugin for color filters, compatible with [shopify color filters](https://help.shopify.com/en/themes/liquid/filters/theme-sections)

## Usage

```bash
npm i liquidjs-section-tags
```

```javascript
import Liquid from 'liquidjs'
import { liquidSectionTags } from '../src/index.ts'

const liquid = new Liquid({ extname: '.liquid' })
liquid.plugin(liquidSectionTags({
  root: resolve(__dirname, './stub/sections')
}))

const html = await liquid.parseAndRender('{{ section "header" }}')
```

## Contribution Guide

Any help will be appreciated.
