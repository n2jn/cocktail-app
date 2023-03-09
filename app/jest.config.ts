import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
