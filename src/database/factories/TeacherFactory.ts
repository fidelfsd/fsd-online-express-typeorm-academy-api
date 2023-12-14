import { faker } from "@faker-js/faker";
import { Teacher } from "../../models/Teacher";
import { BaseFactory } from "./BaseFactory";

export class TeacherFactory extends BaseFactory<Teacher> {
   protected generateSpecifics(teacher: Teacher): Teacher {
      teacher.specialization = faker.person.jobArea();
      teacher.academic_degree = faker.person.jobTitle();
      teacher.work_experience = faker.number.int({ min: 3, max: 15 });

      return teacher;
   }
}
