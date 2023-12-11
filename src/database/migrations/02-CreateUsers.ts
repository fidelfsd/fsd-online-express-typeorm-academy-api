import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1702301796616 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "users",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "username",
                  type: "varchar",
                  length: "40",
                  isUnique: true,
               },
               {
                  name: "password_hash",
                  type: "varchar",
                  length: "255",
               },
               {
                  name: "email",
                  type: "varchar",
                  length: "255",
                  isUnique: true,
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
   }
}
