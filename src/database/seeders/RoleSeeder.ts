import { Role } from "../../models/Role";
import { AppDataSource } from "../data-source";

export const roleSeeder = async () => {
   try {
      await AppDataSource.initialize();

      const roleRepository = AppDataSource.getRepository(Role);

      const adminRole = new Role();
      adminRole.name = "admin";

      const studentRole = new Role();
      studentRole.name = "student";

      const teacherRole = new Role();
      teacherRole.name = "teacher";

      await roleRepository.save([adminRole, studentRole, teacherRole]);

      console.log("Seeding roles completed successfully");

      //
   } catch (error) {
      console.error("Error seeding the database", error);
   } finally {
      await AppDataSource.destroy();
   }
};
