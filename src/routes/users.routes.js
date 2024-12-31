import express from 'express';

import {deleteAllUser, findSpecificUser, getAllUsers, signIn, signOut, signUp} from '../controllers/auth.controller.js';
const router = express.Router();

// router.route("/api/v1/users").get();
router.route("/api/v1/signup").post(signUp);
router.route("/api/v1/user/:id").get(findSpecificUser);
router.route("/api/v1/users").get(getAllUsers);




router.route("/api/v1/signin").post(signIn);
router.route("/api/v1/signup").get(signOut);

router.route("/api/v1/deleteAllUser").delete(deleteAllUser);


export default router