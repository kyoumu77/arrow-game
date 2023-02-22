import { Config } from "@jest/types";

process.env.TZ = "UTC";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: ".test.(ts|tsx?)$",
  setupFilesAfterEnv: ["./test/setupTests.js"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  testEnvironment: 'jsdom',
  globals: {
    "ts-jest": {
      tsconfig: "./test/tsconfig.test.json",
    },
  },
};

export default config;
