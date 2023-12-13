# Express
npm i express

# TypeScript
npm i -D typescript
npm i -D ts-node
npm i -D @types/node
npm i -D @types/express

# Modulos adicionales
npm i cors
npm i -D @types/cors
npm i -D nodemon
npm i -D @faker-js/faker


# TypeORM
npm i typeorm reflect-metadata mysql2

# Crear tsconfig.json
npx tsc --init

    # {
    #     "compilerOptions": {
    #         "target": "ES2021",
    #         "experimentalDecorators": true, 
    #         "emitDecoratorMetadata": true,
    #         "rootDir": "./src",
    #         "outDir": "./dist",
    #     },
    #     "include": [
    #         "src/**/*.ts"
    #     ],
    #     "exclude": [
    #         "node_modules"
    #     ]
    # }
    
# Configurar package.json

    # {
    #     "main": "dist/server.js",
    #     "scripts": {
    #         "build": "npx tsc",
    #         "start": "node dist/server.js",
    #         "dev": "nodemon --files src/server.ts"
    #     },
    # }




# Crear migraciones en TypeORM manualmente
npx typeorm migration:create ./src/migrations/CreateUser

# Ejecutar migraciones en TypeORM 
npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts 

# Revierte la última migración en TypeORM. Para revertir las demás, repetir el comando en orden inverso.
npx typeorm-ts-node-commonjs migration:revert -d ./src/data-source.ts


# Crear modelos
npx typeorm entity:create ./src/models/User

# ------------------------------------------------------------------------------
# Despues de refactorizar la estructura de directorio de la base de datos
# ------------------------------------------------------------------------------

# Crear migraciones manualmente
npx typeorm migration:create ./src/database/migrations/CreateRoles
npx typeorm migration:create ./src/database/migrations/CreateUsers
npx typeorm migration:create ./src/database/migrations/CreateUsersRoles
npx typeorm migration:create ./src/database/migrations/CreateStudents
npx typeorm migration:create ./src/database/migrations/CreateTeachers
npx typeorm migration:create ./src/database/migrations/CreateCourses
npx typeorm migration:create ./src/database/migrations/CreateEnrollments

# Ejecutar migraciones
npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts 

# Crear modelos
npx typeorm entity:create ./src/models/Role
npx typeorm entity:create ./src/models/User
npx typeorm entity:create ./src/models/Student
npx typeorm entity:create ./src/models/Teacher
npx typeorm entity:create ./src/models/Course
npx typeorm entity:create ./src/models/Enrollment


# Borrar base de datos
npx typeorm-ts-node-commonjs schema:drop -d ./src/database/data-source.ts