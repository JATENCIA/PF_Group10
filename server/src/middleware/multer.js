const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Configuración de almacenamiento de Multer para Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', // ejemplo de configuración de formato de archivo
    public_id: (req, file) => Date.now() + '-' + file.originalname // ejemplo de configuración de nombre de archivo
  }
});

// Instancia de Multer con la configuración de almacenamiento de Cloudinary
const upload = multer({ storage: storage });

module.exports ={cloudinary, upload};
