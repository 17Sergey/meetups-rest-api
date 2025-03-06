const dotenv = require("dotenv");

dotenv.config({ path: ".env.test" });

afterAll(async () => {
  // // Закрытие соединения с базой данных после всех тестов
  // await prisma.$disconnect();
  console.log("Все соединения закрыты!");
});
