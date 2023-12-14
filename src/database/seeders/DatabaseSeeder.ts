import { roleSeeder } from "./RoleSeeder";
import { studentSeeder } from "./StudentSeeder";
import { userSeeder } from "./UserSeeder";

// -----------------------------------------------------------------------------

(async () => {
   await roleSeeder();
   await userSeeder();
   await studentSeeder()
})();
