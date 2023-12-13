import {
   BaseEntity,
   Column,
   Entity,
   JoinTable,
   ManyToMany,
   OneToOne,
   PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity("users")
export class User {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ unique: true })
   username!: string;

   @Column()
   password_hash!: string;

   @Column({ unique: true })
   email!: string;

   // N:N con Role
   @ManyToMany(() => Role, (role) => role.users)
   @JoinTable({
      name: "users_roles",
      joinColumn: {
         name: "user_id",
         referencedColumnName: "id",
      },
      inverseJoinColumn: {
         name: "role_id",
         referencedColumnName: "id",
      },
   })
   roles!: Role[];

   // 1:1 con Student
   @OneToOne(() => Student, (student) => student.user)
   student?: Student;

   // 1:1 con Teacher
   @OneToOne(() => Teacher, (teacher) => teacher.user)
   teacher?: Teacher;
}
