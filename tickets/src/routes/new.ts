import express, { request, response } from 'express';
import { requireAuth } from '@walam/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, async (req, res) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
