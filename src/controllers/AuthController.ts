import { Request, Response } from "express";
import {
   CreateStudentRequestBody,
   LoginUserRequestBody,
   TokenData,
} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Student } from "../models/Student";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

// -----------------------------------------------------------------------------

export class AuthController {
   async register(
      req: Request<{}, {}, CreateStudentRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email, first_name, date_of_birth } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const studentRepository = AppDataSource.getRepository(Student);

      try {
         // Crear nuevo usuario
         const newUser: User = {
            username,
            email,
            password_hash: bcrypt.hashSync(password, 10),
            roles: [UserRoles.STUDENT],
         };
         await userRepository.save(newUser);

         // Crear un estudiante
         const newStudent: Student = {
            user: newUser,
            first_name,
            date_of_birth: new Date(date_of_birth),
         };
         await studentRepository.save(newStudent);

         res.status(StatusCodes.CREATED).json({
            message: "Student created successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while creating student",
         });
      }
   }

   async login(
      req: Request<{}, {}, LoginUserRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { password, email } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      try {
         // Validar existencia de email y contraseña
         if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Email or password is required",
            });
         }

         // Encontrar un usuario por email
         const user = await userRepository.findOne({
            where: {
               email: email,
            },
            relations: {
               roles: true,
            },
            select: {
               roles: {
                  name: true,
               },
            },
         });

         // Verificar usuario inexistente
         if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         // Verificar contraseña si el usuario existe
         const isPasswordValid = bcrypt.compareSync(
            password,
            user.password_hash
         );

         // Verificar contraseña valida
         if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         // Generar token

         const roles = user.roles.map((role) => role.name);

         const tokenPayload: TokenData = {
            userId: user.id?.toString() as string,
            userRoles: roles,
         };

         const token = jwt.sign(tokenPayload, "123", {
            expiresIn: "3h",
         });

         res.status(StatusCodes.OK).json({
            message: "Login successfully",
            token,
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while login",
            error,
         });
      }
   }
}
