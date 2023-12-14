import { AppDataSource } from "../data-source";
import { EnrollmentFactory } from "../factories/EnrollmentFactory";
import { Enrollment } from "../../models/Enrollment";
import { Course } from "../../models/Course";
import { CourseFactory } from "../factories/CourseFactory";
import { seedStudentsWithUser } from "./StudentSeeder";
import { generateRandomInteger } from "../../helpers/mathUtils";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de matriculas y su almacenamiento en la base de datos.
 */
export const enrollmentSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Obtener repositorios y fábricas necesarios
      const courseRepository = AppDataSource.getRepository(Course);
      const enrollmentRepository = AppDataSource.getRepository(Enrollment);
      const courseFactory = new CourseFactory(courseRepository);
      const enrollmentFactory = new EnrollmentFactory(enrollmentRepository);

      // Número de estudiantes y cursos a generar
      const studentsCount = 100;
      const coursesCount = 10;

      // Crear estudiantes con usuario y rol 'student'
      const students = await seedStudentsWithUser(studentsCount);

      // Generar cursos
      const courses = courseFactory.createMany(coursesCount);

      // Guardar cursos en la base de datos
      await courseRepository.save(courses);

      // Generar matrículas
      const enrollments = enrollmentFactory.createMany(studentsCount);

      // Asignar estudiante y curso a las matrículas
      enrollments.map((enrollment, index) => {
         enrollment.student = students[index];
         const randomIndex = generateRandomInteger(0, courses.length - 1);
         enrollment.course = courses[randomIndex];
      });

      // Guardar matrículas en la base de datos
      await enrollmentRepository.save(enrollments);

      // Imprimir mensaje de éxito
      console.log("Seeding enrollments successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};
