module.exports = {
  roots: ["src"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|gif|svg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "<rootDir>/**/*.test.(js|jsx|ts|tsx)",
    "<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
