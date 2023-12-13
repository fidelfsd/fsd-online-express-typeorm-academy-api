import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudents1702324979537 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "students",
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
                  name: "first_name",
                  type: "varchar",
                  length: "255",
               },
               {
                  name: "last_name",
                  type: "varchar",
                  length: "255",
                  isNullable: true,
               },
               {
                  name: "date_of_birth",
                  type: "datetime",
               },
               {
                  name: "address",
                  type: "text",
                  isNullable: true,
               },
               {
                  name: "phone_number",
                  type: "varchar",
                  length: "255",
                  isNullable: true,
               },
               {
                  name: "nationality",
                  type: "varchar",
                  length: "255",
                  isNullable: true,
               },
               {
                  name: "gender",
                  type: "enum",
                  enum: ["male", "female"],
                  isNullable: true,
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
      await queryRunner.dropTable("students");
   }
}
