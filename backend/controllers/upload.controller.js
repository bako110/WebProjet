const path = require('path');

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier envoyé.' });
  }

  const type = req.file.mimetype.startsWith('image/') ? 'images' : 'videos';
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${type}/${req.file.filename}`;

  return res.status(200).json({
    message: 'Fichier uploadé avec succès !',
    fileUrl: fileUrl
  });
};
