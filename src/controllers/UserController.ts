import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";

// -----------------------------------------------------------------------------

export class UserController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userRepository = AppDataSource.getRepository(User);
         const allUsers = await userRepository.find();
         res.status(200).json(allUsers);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting users",
         });
      }
   }

   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         const user = await userRepository.findOneBy({
            id: id,
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting user",
         });
      }
   }

   async create(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         const newUser = await userRepository.save(data);
         res.status(201).json(newUser);
      } catch (error) {
         res.status(500).json({
            message: "Error while creating user",
         });
      }
   }

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         const userUpdated = await userRepository.update({ id: id }, data);
         res.status(202).json({
            message: "User updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating user",
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         await userRepository.delete(id);

         res.status(200).json({
            message: "User deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting user",
         });
      }
   }
}
