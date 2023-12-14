import { AppDataSource } from "../data-source";
import { StudentFactory } from "../factories/StudentFactory";
import { Student } from "../../models/Student";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de estudiantes y su almacenamiento en la base de datos.
 */
export const studentSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Definir la cantidad de estudiantes a crear
      const count = 20;

      // Llamar a la función para crear estudiantes con usuarios asociados
      await seedStudentsWithUser(count);

      // Imprimir mensaje de éxito
      console.log("Seeding students successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};

export const seedStudentsWithUser = async (count: number) => {
   // Obtener repositorios y fábricas necesarios
   const studentRepository = AppDataSource.getRepository(Student);
   const studentFactory = new StudentFactory(studentRepository);

   // Generar usuarios asociados a roles de estudiantes
   const users = await seedUsersWithRoles({
      roles: [UserRoles.STUDENT],
      count: count,
   });

   // Generar estudiantes
   const students = studentFactory.createMany(count);

   // Asignar usuario a cada estudiante
   students.forEach((student, index) => {
      student.user = users[index];
   });

   // Guardar estudiantes en la base de datos
   await studentRepository.save(students);

   return students;
};
