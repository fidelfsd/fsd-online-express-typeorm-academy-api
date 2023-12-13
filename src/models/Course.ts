import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enrollment } from "./Enrollment";

@Entity("courses")
export class Course {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   title!: string;

   @Column()
   description!: string;

   @Column()
   start_date!: Date;

   @Column()
   end_date!: Date;

   // 1:N con Enrollment
   @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
   enrollments?: Enrollment[];
}
