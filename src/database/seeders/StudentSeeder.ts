import { AppDataSource } from "../data-source";

import { Role } from "../../models/Role";
import { createUserWithRoles } from "./UserSeeder";
import { Student } from "../../models/Student";
import { StudentFactory } from "../factories/StudentFactory";

export const studentSeeder = async () => {
   try {
      await AppDataSource.initialize();

      const studentRepository = AppDataSource.getRepository(Student);
      const studentFactory = new StudentFactory(studentRepository);

      const count = 10;

      const users = await createUserWithRoles({
         roles: [{ id: 2, name: "student" } as Role],
         count,
      });

      const students = studentFactory.createMany(count);

      students.forEach((student, index) => (student.user = users[index]));

      await studentRepository.save(students);

      console.log("Seeding students completed successfully");
   } catch (error) {
      console.error("Error seeding the database", error);
   } finally {
      await AppDataSource.destroy();
   }
};
