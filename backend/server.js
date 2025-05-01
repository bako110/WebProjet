const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Créer une instance d'Express
const app = express();

// Utiliser CORS pour permettre les requêtes depuis différentes origines (par exemple, votre frontend Angular)
app.use(cors({
  origin: 'http://localhost:4200', // Remplacer par l'URL de ton frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour analyser les données JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de Multer pour gérer le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Crée le dossier si il n'existe pas
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom de fichier unique
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000 * 1024 * 1024 }, // Limite de 100 Mo
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/; // Ajout des vidéos ici !
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    }
    cb(new Error('Seuls les fichiers images ou vidéos sont autorisés.'));
  }
});

// Servir les fichiers statiques depuis le dossier "uploads"
app.use('/uploads', express.static('uploads'));

// Simuler une base de données en mémoire
let banners = [];
let events = [];
let ads = [];
let videos = [];
let products = [];
let testimonials = [];
let news = [];

// -------- ROUTES --------

// Route pour ajouter une bannière
app.post('/api/banniere', upload.single('image'), (req, res) => {
  try {
    const { title, description, ctaLink } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Le titre et la description sont requis.' });
    }

    const banner = {
      title,
      description,
      ctaLink,
      image: req.file ? req.file.filename : null
    };
    banners.push(banner);
    res.status(201).json({ message: 'Bannière ajoutée avec succès!', banner });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la bannière:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

// Route pour ajouter un événement
app.post('/api/evenement', upload.single('image'), (req, res) => {
  try {
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Le titre, la description et la date sont requis.' });
    }

    const event = {
      title,
      description,
      date,
      image: req.file ? req.file.filename : null
    };
    events.push(event);
    res.status(201).json({ message: 'Événement ajouté avec succès!', event });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'événement:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

// Route pour ajouter une publicité
app.post('/api/publicite', upload.single('image'), (req, res) => {
  
  try {
    const { title, description, link } = req.body;
    if (!title || !description || !link) {
      return res.status(400).json({ message: 'Le titre, la description et le lien sont requis.' });
    }

    const ad = {
      title,
      description,
      link,
      image: req.file ? req.file.filename : null
    };
    ads.push(ad);
    res.status(201).json({ message: 'Publicité ajoutée avec succès!', ad });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la publicité:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

// Route pour recevoir une vidéo
app.post('/api/video', upload.single('video'), (req, res) => {
  try {
    console.log("🔔 Requête reçue pour ajout de vidéo");

    const { title, description } = req.body;
    if (!title || !description || !req.file) {
      return res.status(400).json({ message: 'Le titre, la description et la vidéo sont requis.' });
    }

    const video = {
      title,
      description,
      video: req.file.filename
    };

    videos.push(video); // Sauvegarde temporaire
    res.status(201).json({ message: 'Vidéo ajoutée avec succès!', video });
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout de la vidéo :', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

// Route pour ajouter un produit
app.post('/api/produit', upload.single('image'), (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'Le nom, le prix et la description sont requis.' });
    }

    const product = {
      name,
      price,
      description,
      image: req.file ? req.file.filename : null
    };
    products.push(product);
    res.status(201).json({ message: 'Produit ajouté avec succès!', product });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

// Route pour ajouter un témoignage
app.post('/api/temoignage', upload.single('image'), (req, res) => {
  try {
    const { author, testimonialText } = req.body;
    if (!author || !testimonialText) {
      return res.status(400).json({ message: 'L\'auteur et le texte sont requis.' });
    }

    const testimonial = {
      author,
      testimonialText,
      image: req.file ? req.file.filename : null
    };
    testimonials.push(testimonial);
    res.status(201).json({ message: 'Témoignage ajouté avec succès!', testimonial });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du témoignage:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

// Route pour ajouter une actualité
app.post('/api/actualite', upload.single('image'), (req, res) => {
  try {
    const { title, content, date } = req.body;
    if (!title || !content || !date) {
      return res.status(400).json({ message: 'Le titre, le contenu et la date sont requis.' });
    }

    const newsItem = {
      title,
      content,
      date,
      image: req.file ? req.file.filename : null
    };
    news.push(newsItem);
    res.status(201).json({ message: 'Actualité ajoutée avec succès!', newsItem });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'actualité:', error);
    res.status(500).json({ message: 'Erreur interne.' });
  }
});

// ----------- ROUTES GET -----------
// Pour récupérer les données
app.get('/api/banniere', (req, res) => res.json(banners));
app.get('/api/evenement', (req, res) => res.json(events));
app.get('/api/publicite', (req, res) => res.json(ads));
app.get('/api/video', (req, res) => res.json(videos));
app.get('/api/produit', (req, res) => res.json(products));
app.get('/api/temoignage', (req, res) => res.json(testimonials));
app.get('/api/actualite', (req, res) => res.json(news));

// ----------- ERREUR HANDLER -----------
// Gérer les erreurs non capturées
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur.' });
});

// ----------- START SERVER -----------
// Démarrer le serveur sur le port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

module.exports = app;
