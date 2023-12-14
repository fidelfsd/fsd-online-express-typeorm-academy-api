import { UserRoles } from "../../constants/UserRoles";
import { Role } from "../../models/Role";
import { AppDataSource } from "../data-source";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de roles y su almacenamiento en la base de datos.
 */
export const roleSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Obtener el repositorio de roles
      const roleRepository = AppDataSource.getRepository(Role);

      // Definir los roles a sembrar (utilizando valores de UserRoles)
      const roles: Role[] = [
         UserRoles.ADMIN,
         UserRoles.STUDENT,
         UserRoles.TEACHER,
      ];

      // Guardar los roles en la base de datos
      await roleRepository.save(roles);

      // Imprimir mensaje de éxito
      console.log("Seeding roles successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};
