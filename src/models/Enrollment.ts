import {
   Column,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity("enrollments")
export class Enrollment {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   enrollment_date!: Date;

   @Column()
   status!: string;

   // 1:N con Course
   @ManyToOne(() => Course, (course) => course.enrollments)
   @JoinColumn({ name: "course_id" }) // clave foranea
   course!: Course;

   // 1:N con Student
   @ManyToOne(() => Student, (student) => student.enrollments)
   @JoinColumn({ name: "student_id" }) // clave foranea
   student!: Student;
}
