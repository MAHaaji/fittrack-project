// Runs before every test file. Gives the app a predictable secret to sign
// tokens with, so we don't depend on the real .env during tests.
process.env.JWT_SECRET = "test_secret_key";