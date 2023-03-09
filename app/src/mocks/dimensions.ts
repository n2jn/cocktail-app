export const mockDimensions = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({width, height}),
  }));
};

export const unMockDimensions = () => {
  jest.dontMock('react-native/Libraries/Utilities/Dimensions');
  jest.resetModules();
};
