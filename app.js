// Pour IMPORTER 'mongoose' (BdD 'MongoDB')
const mongoose = require('mongoose');

// Pour IMPORTER le routeur (EXPORTE par 'routes/stuff.js')
const stuffRoutes = require('./routes/stuff');

// Pour IMPORTER le routeur (EXPORTE par 'routes/user.js')
const userRoutes = require('./routes/user');

// Pour IMPORTER 'express' (Application 'Express')
const express = require('express');

// Code autre élève
//const bodyParser = require('body-parser'); // 'body-parser' est présent dans le fichier 'TS'

// Pour ACCEDER au 'path' du server
const path = require('path');

// Pour CREER une application
const app = express();

// Connexion entre la BdD et l'API (BdD : 'test')
mongoose.connect('mongodb+srv://Laury:G9mD5wGRGc%40m4NV@cluster0.4npgx.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Pour INTERCEPTER toutes les requêtes qui contiennent du json et METTRE à disposition ce contenu (ACCEDER au corps de la requête) sur l'objet 'requête' (dans req.body)
// (identique à 'body-parser')
app.use(express.json());

// Pour IMPLEMENTER "CORS" (appels sécurisés vers l'application) (pas d'URL précisée pour permettre une application à toutes les routes)
app.use((req, res, next) => {
    // Pour accéder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Pour ajouter les headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Pour envoyer des requêtes avec différentes méthodes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Pour ENREGISTRER les routes (présentes dans 'routes/stuff.js')
app.use('/api/stuff', stuffRoutes);

// Pour ENREGISTRER les routes (présentes dans 'routes/user.js')
app.use('/api/auth', userRoutes); // 'auth' : racine de tout ce qui est lié à l'authentification

// Code autre élève
//app.use(bodyParser.json());

// Pour TRAITER les requêtes qui vont vers la route '/image' en rendant le répertoire 'images' statique (cela permet aux images de s'afficher sur le site)
app.use('/images',express.static(path.join(__dirname,'images'))); // Cela indique à 'Express' qu'il faut gérer la ressource 'images' de manière statique (un sous-répertoire du répertoire de base, '__dirname') à chaque fois qu'elle reçoit une requête vers la route '/images'

// Pour EXPORTER l'application
module.exports = app;

