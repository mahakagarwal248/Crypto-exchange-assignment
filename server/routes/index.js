import express from 'express';
import { getData, storeData } from '../controllers/exchangeData.js';

const router = express.Router();
const app = express();

router.route('/save').get(storeData);
router.route('/get').get(getData);

export default router;