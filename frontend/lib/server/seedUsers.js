import User from "../../models/User";

export default async function seedUsers() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASS;

  if (
    adminEmail &&
    adminPassword &&
    process.env.ADMIN_FIRSTNAME &&
    process.env.ADMIN_LASTNAME &&
    !(await User.exists({ email: adminEmail }))
  ) {
    try {
      await User.create({
        firstname: process.env.ADMIN_FIRSTNAME,
        lastname: process.env.ADMIN_LASTNAME,
        email: adminEmail,
        password: adminPassword,
        isAdmin: true,
        images: [],
      });
    } catch (error) {
      if (error.code !== 11000) throw error;
    }
  }

  if (
    process.env.NODE_ENV !== "production" &&
    !(await User.exists({ email: "testuser@email.com" }))
  ) {
    try {
      await User.create({
        firstname: "test",
        lastname: "user",
        email: "testuser@email.com",
        password: "11111",
        images: [],
        isTestUser: true,
      });
    } catch (error) {
      if (error.code !== 11000) throw error;
    }
  }
}
