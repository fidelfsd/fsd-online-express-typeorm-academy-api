import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersRoles1702301805968 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "users_roles",
            columns: [
               {
                  name: "user_id",
                  type: "int",
                  isPrimary: true,
               },
               {
                  name: "role_id",
                  type: "int",
                  isPrimary: true,
               },
            ],
            foreignKeys: [
               {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
               },
               {
                  columnNames: ["role_id"],
                  referencedTableName: "roles",
                  referencedColumnNames: ["id"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users_roles");
   }
}
