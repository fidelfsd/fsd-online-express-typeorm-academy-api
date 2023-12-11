import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEnrollments1702325306688 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "enrollments",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "student_id",
                  type: "int",
               },
               {
                  name: "course_id",
                  type: "int",
               },
               {
                  name: "enrollment_date",
                  type: "datetime",
               },
               {
                  name: "status",
                  type: "enum",
                  enum: ["enrolled", "canceled"],
               },
            ],
            foreignKeys: [
               {
                  columnNames: ["student_id"],
                  referencedTableName: "students",
                  referencedColumnNames: ["id"],
               },
               {
                  columnNames: ["course_id"],
                  referencedTableName: "courses",
                  referencedColumnNames: ["id"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("enrollments");
   }
}
