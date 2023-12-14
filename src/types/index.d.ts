import { TokenData } from "./types";

declare global {
   namespace Express {
      export interface Request {
         tokenData: TokenData;
      }
   }
}
