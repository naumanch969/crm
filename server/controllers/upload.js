import fs from 'fs/promises';
import { createError } from '../utils/error.js';


export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) next(createError(400, 'No image to upload'))

        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ result: imageUrl });

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const deleteImage = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const imagePath = `uploads/${filename}`;

        const fileExists = await fs.access(imagePath)
            .then(() => true)
            .catch(() => false);

        if (fileExists) {
            await fs.unlink(imagePath);
            res.status(200).json({ message: 'Image deleted successfully.' });
        } else {
            res.status(201).json({ message: 'Image not found.' });
        }

    } catch (err) {
        next(createError(500, err.message))
    }
}