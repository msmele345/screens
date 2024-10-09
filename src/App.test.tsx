import { describe, it, expect } from 'vitest'
import { getImageName } from './util/StringUtils';

describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1+1).toEqual(2)
  })
});

describe('should parse string', () => {
  it('pull file name out of path', () => {
    const url = "https://reactblob1.blob.core.windows.net/sa1/2019_panic_staugie.jpg?undefined";

    const expected = "2019_panic_staugie.jpg";

    const actual = getImageName(url);
    console.log("ACTUAL: ", actual);
    expect(actual).toBe(expected);
  })
});

