const dotenv = require("dotenv");

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
});
