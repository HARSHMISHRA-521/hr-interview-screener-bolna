import { Router } from 'express';
import { bolnaWebhookHandler } from '../controllers/webhookController.js';

const router = Router();

// POST /api/webhooks/bolna
router.post('/bolna', bolnaWebhookHandler);

export default router;
