const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadFile } = require('../controllers/uploadController');

// Création des dossiers 'uploads/images' et 'uploads/videos' s'ils n'existent pas
['images', 'videos'].forEach(folder => {
  const dir = path.join(__dirname, '../uploads', folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Configuration de stockage pour multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = file.mimetype.startsWith('image/') ? 'images' : 'videos';
    cb(null, path.join(__dirname, '../uploads', type));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Route POST pour uploader un fichier
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
