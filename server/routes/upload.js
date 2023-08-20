import express from "express"
const router = express.Router()

import { uploadImage,deleteImage } from "../controllers/upload.js"
import { upload } from "../multer.js"

router.post('/upload_image', upload.single('image'), uploadImage)
router.delete('/delete_image/:filename',  deleteImage)

export default router