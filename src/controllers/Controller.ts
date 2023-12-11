import { Request, Response } from "express";

// -----------------------------------------------------------------------------

export interface Controller {
   getAll(req: Request, res: Response): Promise<void | Response<any>>;
   getById(req: Request, res: Response): Promise<void | Response<any>>;
   create(req: Request, res: Response): Promise<void | Response<any>>;
   update(req: Request, res: Response): Promise<void | Response<any>>;
   delete(req: Request, res: Response): Promise<void | Response<any>>;
}
