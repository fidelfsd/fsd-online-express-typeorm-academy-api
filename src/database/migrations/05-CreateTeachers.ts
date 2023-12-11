import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTeachers1702325171027 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "teachers",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "user_id",
                  type: "int",
                  isUnique: true,
               },
               {
                  name: "specialization",
                  type: "varchar",
                  length: "255",
               },
               {
                  name: "academic_degree",
                  type: "varchar",
                  length: "255",
               },
               {
                  name: "work_experience",
                  type: "int",
               },
            ],
            foreignKeys: [
               {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("teachers");
   }
}
