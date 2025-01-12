import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Si tu utilises TypeScript avec Jest
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Mapper pour résoudre les chemins absolus
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Pour transformer les fichiers .ts et .tsx
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'], // Extensions de fichiers à prendre en compte
};

export default config;
