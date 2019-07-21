import { expect } from 'chai'
import { liquidSectionTags } from '../src/index'

describe('liquidSectionTags', function () {
  it('should return function', async () => {
    expect(liquidSectionTags()).to.be.instanceof(Function)
  })
})
