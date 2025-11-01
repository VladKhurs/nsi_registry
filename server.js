const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nsi_registry')
  .then(() => console.log('MongoDB подключена'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

const NSISchema = new mongoose.Schema({}, { strict: false });
const collectionNames = ['NSI_21', 'NSI_26', 'NSI_27', 'NSI_47', 'NSI_54'];
const nsiModels = collectionNames.reduce((acc, name) => {
  acc[name] = mongoose.model(name, NSISchema, name);
  return acc;
}, {});

app.get('/', async (req, res) => {
  try {
    const dataPromises = Object.values(nsiModels).map(model => model.find({}));
    const results = await Promise.all(dataPromises);
    const allData = Object.keys(nsiModels).reduce((acc, modelName, index) => {
      acc[modelName] = results[index];
      return acc;
    }, {});
    
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ошибка 500' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});