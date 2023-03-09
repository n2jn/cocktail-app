import {moderateScale} from '~gStyles/size';
import {mockDimensions, unMockDimensions} from '~mocks/dimensions';

describe('moderateScale with 720x1334', () => {
  beforeAll(() => {
    mockDimensions({
      width: 750,
      height: 1334,
    });
  });

  afterAll(() => {
    unMockDimensions();
  });
  test.each`
    size
    ${8}
    ${12}
    ${16}
    ${32}
    ${64}
  `(`raw size of $size should not return NaN`, ({size}: {size: number}) => {
    const scaledSize = moderateScale(size);
    expect(scaledSize).not.toBeNaN();
  });
  test.each`
    size  | expected
    ${8}  | ${14}
    ${12} | ${20}
    ${16} | ${27}
    ${32} | ${54}
    ${64} | ${107}
  `(
    `raw size of $size should return a scaled size of $expected`,
    ({size, expected}: {size: number; expected: number}) => {
      const scaledSize = moderateScale(size);
      expect(scaledSize).toBeCloseTo(expected, 1);
    },
  );
});
