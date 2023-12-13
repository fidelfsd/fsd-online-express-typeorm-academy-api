import {
   Column,
   Entity,
   JoinColumn,
   OneToOne,
   PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("teachers")
export class Teacher {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   specialization!: string;

   @Column()
   academic_degree!: string;

   @Column()
   work_experience!: number;

   // 1:1 con User
   @OneToOne(() => User, (user) => user.teacher)
   @JoinColumn({ name: "user_id" })
   user!: User;
}
