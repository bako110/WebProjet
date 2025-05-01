const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Définir les dossiers d'upload
const uploadBase = path.join(__dirname, '..', 'uploads');
const folders = ['images', 'videos'];

// Création des dossiers s'ils n'existent pas
folders.forEach(folder => {
  const fullPath = path.join(uploadBase, folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Configuration de stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(uploadBase, 'images'));
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, path.join(uploadBase, 'videos'));
    } else {
      cb(new Error('Type de fichier non supporté'), false);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Export du middleware multer
module.exports = multer({ storage });
