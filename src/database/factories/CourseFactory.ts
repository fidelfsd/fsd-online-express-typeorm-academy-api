import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Course } from "../../models/Course";

export class CourseFactory extends BaseFactory<Course> {
   protected generateSpecifics(course: Course): Course {
      course.title = faker.lorem.words({ min: 1, max: 5 });
      course.description = faker.lorem.sentence(2);
      course.start_date = faker.date.recent();
      course.end_date = faker.date.soon({ days: 90 });

      return course;
   }
}
