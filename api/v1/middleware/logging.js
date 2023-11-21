import express from 'express';

const router = express.Router();

function logRequest(req, res, next) {
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url} from ${req.ip}`);
    next();
}

router.use(logRequest);

export default router;
