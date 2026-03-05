import { Router } from 'express';
import { applyForJob, getCandidates } from '../controllers/candidateController.js';

const router = Router();

// POST /api/candidates/apply
router.post('/apply', applyForJob);

// GET /api/candidates
router.get('/', getCandidates);

export default router;
