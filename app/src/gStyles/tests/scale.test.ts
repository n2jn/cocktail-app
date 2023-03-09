import {scale} from '~gStyles/size';
import {mockDimensions, unMockDimensions} from '~mocks/dimensions';

describe('scale with 720x1334', () => {
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
    const scaledSize = scale(size);
    expect(scaledSize).not.toBeNaN();
  });
  test.each`
    size  | expected
    ${8}  | ${19}
    ${12} | ${28}
    ${16} | ${38}
    ${32} | ${75}
    ${64} | ${150}
  `(
    `raw size of $size should return a scaled size of $expected`,
    ({size, expected}: {size: number; expected: number}) => {
      const scaledSize = scale(size);
      expect(scaledSize).toBeCloseTo(expected, 1);
    },
  );
});
