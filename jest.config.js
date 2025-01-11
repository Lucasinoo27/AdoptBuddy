module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx"],
  testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)", "**/__tests__/*.[jt]s?(x)"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js",
    "!src/router/index.js",
    "!**/node_modules/**",
  ],
  coverageReporters: ["text", "json-summary", "lcov"],
};
