export default {
  // we mock the database, so no real Postgres is needed
  testMatch: ["**/tests/**/*.test.js"],
  setupFiles: ["<rootDir>/tests/setup.js"],
  // our code is plain ES modules; no Babel transform required
  transform: {},
  verbose: true,
};