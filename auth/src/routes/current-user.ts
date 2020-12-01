import express from 'express';
import { currentUser } from '@walam/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  console.log('Inside auth microservice currentuser');
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
