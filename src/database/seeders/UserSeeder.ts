import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";

export const userSeeder = async () => {
   try {
      await AppDataSource.initialize();

      //
   } catch (error) {
      console.error("Error seeding the database", error);
   } finally {
      await AppDataSource.destroy();
   }
};
