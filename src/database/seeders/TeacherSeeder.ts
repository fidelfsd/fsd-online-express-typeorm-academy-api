import { AppDataSource } from "../data-source";
import { TeacherFactory } from "../factories/TeacherFactory";
import { Teacher } from "../../models/Teacher";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de profesores y su almacenamiento en la base de datos.
 */
export const teacherSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Definir la cantidad de profesores a crear
      const count = 10;

      // Llamar a la función para crear profesores con usuarios asociados
      await seedTeachersWithUser(count);

      // Imprimir mensaje de éxito
      console.log("Seeding teachers successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};

export const seedTeachersWithUser = async (count: number) => {
   // Obtener repositorios y fábricas necesarios
   const teacherRepository = AppDataSource.getRepository(Teacher);
   const teacherFactory = new TeacherFactory(teacherRepository);

   // Generar usuarios con roles de profesor
   const users = await seedUsersWithRoles({
      roles: [UserRoles.TEACHER],
      count,
   });

   // Generar profesores
   const teachers = teacherFactory.createMany(count);

   // Asignar usuario a cada profesor
   teachers.forEach((teacher, index) => {
      teacher.user = users[index];
   });

   // Guardar profesores en la base de datos
   await teacherRepository.save(teachers);

   return teachers;
};
