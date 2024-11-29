const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const likesFile = path.join(__dirname, 'likes.json');

// Fonction pour lire les likes depuis le fichier
const readLikes = () => {
  try {
    const data = fs.readFileSync(likesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erreur de lecture du fichier:', err);
    return { likeCount: 102 };  // Valeur par défaut si le fichier est vide ou incorrect
  }
};

// Fonction pour écrire les likes dans le fichier
const writeLikes = (newLikeCount) => {
  try {
    console.log('Ecriture dans le fichier likes.json:', newLikeCount);  // Ajout d'un log pour vérifier l'écriture
    fs.writeFileSync(likesFile, JSON.stringify({ likeCount: newLikeCount }), 'utf8');
  } catch (err) {
    console.error('Erreur d\'écriture dans le fichier:', err);
  }
};

// Route GET pour récupérer le nombre de likes
app.get('/api/likes', (req, res) => {
  const likesData = readLikes();
  res.json(likesData);  // Renvoie le nombre de likes
});

// Route POST pour mettre à jour le nombre de likes
app.post('/api/likes', (req, res) => {
  const { likeCount } = req.body;

  // Vérification de l'envoi de likeCount
  if (likeCount !== undefined && !isNaN(likeCount)) {
    writeLikes(likeCount);
    res.status(200).json({ likeCount: likeCount });
  } else {
    res.status(400).json({ error: 'likeCount manquant ou invalide' });
  }
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});