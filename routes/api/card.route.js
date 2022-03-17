/* eslint-disable camelcase */
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const { Card } = require('../../db/models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.env.PWD, 'public/images'));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/card/new', upload.single('card_url'), async (req, res) => {
  try {
    const {
      card_name, card_price, id_condition, card_url, id,
    } = req.body;
    // const { id } = req.session;
    if (id && card_price && id_condition && card_name && card_url) {
      await Card.create({
        card_name, card_price, id_condition, card_url, id_user: id,
      });
      res.status(200).json({ message: 'Карточка добавлена на сайт' });
    } else {
      res.status(400).json({ message: 'Ошибка ввода данных' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Ошибка создания карточки' });
  }
});

module.exports = router;
