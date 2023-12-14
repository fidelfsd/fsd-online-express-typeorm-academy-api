import { faker } from "@faker-js/faker";
import { Enrollment } from "../../models/Enrollment";
import { BaseFactory } from "./BaseFactory";

export class EnrollmentFactory extends BaseFactory<Enrollment> {
   protected generateSpecifics(enrollment: Enrollment): Enrollment {
      enrollment.enrollment_date = faker.date.recent();
      enrollment.status = faker.helpers.arrayElement(["enrolled", "canceled"]);

      return enrollment;
   }
}
