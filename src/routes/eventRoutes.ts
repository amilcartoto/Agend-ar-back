import { Router } from 'express';
import { getEvents, createEvent } from '../controllers/eventController';
import upload from '../middleware/upload';

const router = Router();

router.post('/', upload.single('image'), createEvent);

export default router;
