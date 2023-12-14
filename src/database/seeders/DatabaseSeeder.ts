import { courseSeeder } from "./CourseSeeder";
import { enrollmentSeeder } from "./EnrollmentSeeder";
import { roleSeeder } from "./RoleSeeder";
import { studentSeeder } from "./StudentSeeder";
import { teacherSeeder } from "./TeacherSeeder";
import { userSeeder } from "./UserSeeder";

// -----------------------------------------------------------------------------

/**
 * Función autoinvocada para ejecutar los seeders en un orden específico.
 *
 * @remarks
 * Este bloque de código ejecuta una serie de funciones seeder de manera secuencial:
 * - `roleSeeder`: Crea roles en la base de datos.
 * - `userSeeder`: Crea usuarios administradores en la base de datos.
 * - `studentSeeder`: Crea usuarios estudiantes en la base de datos sin matricular en cursos.
 * - `teacherSeeder`: Crea usuarios profesores en la base de datos.
 * - `courseSeeder`: Crea cursos en la base de datos sin asignar a profesores ni estudiantes.
 * - `enrollmentSeeder`: Crea usuarios, cursos y matrículas a partir de los usuarios y cursos generados.
 */
(async () => {
   console.log("-----------------------------------------------");
   console.log("Starting seeders...");
   console.log("-----------------------------------------------");

   // Ejecutar seeders en orden
   await roleSeeder(); // .......... Crear roles
   await userSeeder(); // .......... Crear usuarios administradores
   await studentSeeder(); // ....... Crear usuarios estudiantes sin matricular
   await teacherSeeder(); // ....... Crear usuarios profesores
   await courseSeeder(); // ........ Crear cursos sin asignar
   await enrollmentSeeder(); // .... Crear usuarios, cursos y matrículas

   console.log("-----------------------------------------------");
})();
