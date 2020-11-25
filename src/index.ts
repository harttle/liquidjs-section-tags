import { Liquid } from 'liquidjs'
import { JavaScript } from './javascript'
import { Schema } from './schema'
import { Section } from './section'
import { StyleSheet } from './stylesheet'

export function liquidSectionTags () {
  return function (this: Liquid): void {
    this.registerTag('section', Section)
    this.registerTag('schema', Schema)
    this.registerTag('stylesheet', StyleSheet)
    this.registerTag('javascript', JavaScript)
  }
}
