import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Role } from "../../models/Role";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de usuarios y su almacenamiento en la base de datos.
 */
export const userSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Definir la cantidad de estudiantes a crear
      const count = 3;

      // / Llamar a la función para sembrar usuarios con roles de admin
      await seedUsersWithRoles({
         roles: [UserRoles.ADMIN],
         count: count,
      });

      // Imprimir mensaje de éxito
      console.log("Seeding users successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};

export const seedUsersWithRoles = async ({
   roles,
   count,
}: {
   roles: Role[];
   count: number;
}) => {
   // Obtener repositorios y fábricas necesarios
   const userRepository = AppDataSource.getRepository(User);
   const userFactory = new UserFactory(userRepository);

   // Generar usuarios
   const users = userFactory.createMany(count);

   // Asignar roles a cada usuario
   users.forEach((user) => {
      user.roles = roles;
   });

   // Guardar usuarios en la base de datos
   await userRepository.save(users);

   return users;
};
