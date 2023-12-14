import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Student } from "../../models/Student";

// -----------------------------------------------------------------------------

export class StudentFactory extends BaseFactory<Student> {
   protected generateSpecifics(student: Student): Student {
      student.first_name = faker.person.firstName();
      student.last_name = faker.person.lastName();
      student.date_of_birth = faker.date.birthdate();
      student.address = faker.location.streetAddress();
      student.phone_number = faker.phone.number();
      student.nationality = faker.location.country();
      student.gender = faker.person.sexType();

      return student;
   }
}
