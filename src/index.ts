import Liquid from 'liquidjs'
import { sectionTag } from './section'
import { Schema } from './schema'
import { StyleSheet } from './stylesheet'
import { JavaScript } from './javascript'

interface SectionOptions {
  /* root directory for sections */
  root?: string;
}

export function liquidSectionTags (options: Partial<SectionOptions> = {}) {
  const opts = Object.assign({
    root: 'sections'
  }, options)
  return function (this: Liquid) {
    this.registerTag('section', sectionTag(opts.root))
    this.registerTag('schema', Schema)
    this.registerTag('stylesheet', StyleSheet)
    this.registerTag('javascript', JavaScript)
  }
}
