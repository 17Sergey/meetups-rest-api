import { userRepository } from "@repositories/UserRepository";
import { userService } from "@services/user";
import { USER_ROLES } from "@utils/constants";
import { SignupSchema } from "@utils/dto/user";

export const initializeAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  const admin = await userRepository.getByEmail(adminEmail);

  if (!admin) {
    const adminData: SignupSchema = {
      email: adminEmail,
      password: adminPassword,
      fullName: "John Admin",
      role: USER_ROLES.ORGANIZER,
    };

    await userService.signup(adminData);

    console.log("[db]: Admin user initialized");
  }
};
