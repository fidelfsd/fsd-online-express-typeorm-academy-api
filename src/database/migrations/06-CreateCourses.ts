import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCourses1702325240680 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "courses",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },

               {
                  name: "title",
                  type: "varchar",
                  length: "255",
               },

               {
                  name: "description",
                  type: "text",
               },
               {
                  name: "start_date",
                  type: "datetime",
               },
               {
                  name: "end_date",
                  type: "datetime",
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("courses");
   }
}
