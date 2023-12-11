import { faker } from "@faker-js/faker";
import { User } from "../../models/User";

// -----------------------------------------------------------------------------

export class UserFactory {
   private static generate() {
      const user = new User();
      //

      return user;
   }

   static create(count = 1) {
      return Array.from({ length: count }, this.generate);
   }
}
