import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/", auth, isAdmin, userController.getAll);
router.get("/:id", auth, isAdmin, userController.getById);
router.post("/", auth, isAdmin, userController.create);
router.patch("/:id", auth, isAdmin, userController.update);
router.delete("/:id", auth, isAdmin, userController.delete);

export default router;
