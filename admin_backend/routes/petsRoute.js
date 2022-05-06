import express from 'express';
import { addPets, deletePet, listPets, updatePet } from '../controllers/petsController.js';
const router = express.Router();

router.route('/addpets').post(addPets);
router.route('/').get(listPets);
router.route('/delete').post(deletePet);
router.route('/update').put(updatePet);


export default router;