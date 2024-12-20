import express from 'express';
import protectRoutes from '../middleware/protectRoutes.js';

const router = express.Router();

router.get('/', protectRoutes , getUsersForSidebar);

export default router;