import { Router } from 'express';
import { getAllProvinces, createProvince } from '../controllers/provinceController';

const router = Router();

router.get('/', getAllProvinces);
router.post('/', createProvince);

export default router;
