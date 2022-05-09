import express from 'express';
import { adminAuth } from '../controllers/adminController.js';

const router = express.Router();

router.route('/auth').post(adminAuth);

export default router;