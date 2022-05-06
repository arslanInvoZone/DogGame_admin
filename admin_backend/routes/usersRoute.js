import express from 'express';
import { addUsers, deleteUser, listUsers, userAuth } from '../controllers/usersController.js';

const router = express.Router();

router.route('/adduser').post(addUsers);
router.route('/auth').post(userAuth);
router.route('/').get(listUsers);
router.route('/delete').post(deleteUser);

export default router;