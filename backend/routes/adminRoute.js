import express from 'express';
import { addHotel } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router()

adminRouter.post('/add-hotel', upload.single('image'), addHotel)

export default adminRouter