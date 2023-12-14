import { AppDataSource } from "../data-source";
import { Course } from "../../models/Course";
import { CourseFactory } from "../factories/CourseFactory";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de cursos y su almacenamiento en la base de datos.
 */
export const courseSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Obtener el repositorio de cursos y la fábrica de cursos
      const courseRepository = AppDataSource.getRepository(Course);
      const courseFactory = new CourseFactory(courseRepository);

      // Número de cursos a generar
      const count = 10;

      // Generar cursos
      const courses =  courseFactory.createMany(count);

      // Guardar los cursos en la base de datos
      await courseRepository.save(courses);

      // Imprimir mensaje de éxito
      console.log("Seeding courses successfully completed");
   } catch (error) {
      // Capturar y manejar cualquier error durante el proceso
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};
