import express from "express";
import { body, validationResult } from "express-validator";

// component
import fetchUser from "../middleware/fetchUser.js";
import {
  addNotes,
  deleteNote,
  updateNote,
  userNotes,
} from "../controller/notesController.js";

const router = express.Router();

// ROUTE 4: Get all the Notes using: GET "". Login required so we'll use middleware 'fetchUser'
router.get("/fetchallnotes", fetchUser, userNotes);

// ROUTE 5: Add a new Note using : POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("description", "Description can'nt be empty").isLength({ min: 1 }),
  ],
  addNotes
);

// ROUTE 6: Update an existing Note using : PUT "/api/notes/updatenote"
router.put("/updatenote/:id", fetchUser, updateNote);
// for updating use 'put' request, we can use 'post' or 'get' also

// ROUTE 7: Delete an existing Note using : DELETE "/api/notes/deletenote"
router.delete("/deletenote/:id", fetchUser, deleteNote); // for deleting use 'DELETE' request, we can use 'post' or 'get' also

export default router;
