import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Role } from "../../models/Role";

export const userSeeder = async () => {
   try {
      await AppDataSource.initialize();

      const count = 3;

      await createUserWithRoles({
         roles: [{ id: 1, name: "admin" } as Role],
         count,
      });

      console.log("Seeding users completed successfully");
   } catch (error) {
      console.error("Error seeding the database", error);
   } finally {
      await AppDataSource.destroy();
   }
};

export const createUserWithRoles = async ({
   roles,
   count,
}: {
   roles: Role[];
   count: number;
}): Promise<User[]> => {
   const userRepository = AppDataSource.getRepository(User);
   const userFactory = new UserFactory(userRepository);

   // genenar usuarios
   const users = userFactory.createMany(count);

   // asignar relaciones de roles
   users.forEach((user) => (user.roles = roles));

   await userRepository.save(users);

   return users;
};
