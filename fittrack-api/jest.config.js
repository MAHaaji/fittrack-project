export default {
  // we mock the database, so no real Postgres is needed
  testMatch: ["**/tests/**/*.test.js"],
  setupFiles: ["<rootDir>/tests/setup.js"],
 
  transform: {},
  verbose: true,
};