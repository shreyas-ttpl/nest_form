import { Router } from 'express';
import { automateFormController } from '../controllers/formController';
const router = Router();

router.post('/', automateFormController);

export default router;