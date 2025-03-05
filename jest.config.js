/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  coveragePathIgnorePatterns: ["/node_modules/", "/.history/", "/dist/"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/.history/",
  ],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@configs/(.*)$": "<rootDir>/src/configs/$1",
    "^@db/(.*)$": "<rootDir>/src/db/$1",
    "^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  transform: {
    "^.+\.tsx?$": ["ts-jest", {}],
  },
};

