import {
   Column,
   Entity,
   JoinColumn,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Enrollment } from "./Enrollment";

@Entity("students")
export class Student {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   first_name!: string;

   @Column()
   last_name!: string;

   @Column()
   date_of_birth!: Date;

   @Column()
   phone_number!: string;

   @Column()
   gender!: string;

   @Column()
   nationality!: string;

   // 1:1 con User
   @OneToOne(() => User, (user) => user.student)
   @JoinColumn({ name: "user_id" })
   user!: User;

   // 1:N con Enrollment
   @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
   enrollments?: Enrollment[];
}
