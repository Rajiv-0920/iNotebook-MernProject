import express from "express";
import { body } from "express-validator";

// component
import {
  updateUser,
  userLoginIn,
  userSignup,
} from "../controller/userController.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

// ROUTE 1: Create a User "/api/auth/createUser". No login Required( Sign Up )
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }), // for validation
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  userSignup
);

// ROUTE 2:  user SignIn  No login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(), // for validation
    body("password", "Password can't be blank").exists(),
  ],
  userLoginIn
);

// ROUTE 3: Update loggedIn User Details using "/api/auth/updateUser". login required
router.put("/updateUser", fetchUser, updateUser);
// 'fetchUser' is a middleware, it is used to authenticate user wherever it required in project

export default router;
