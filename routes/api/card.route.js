/* eslint-disable camelcase */
const { Card } = require('../db/models');

const router = require('express').Router();

router.post('/card/new', async (req, res) => {
  try {
    const {
      card_name, card_price, card_condition, card_url,
    } = req.body;
    const { id } = req.session;
    if (id && card_price && card_condition && card_name && card_url) {
      await Card.create({
        card_name, card_price, card_condition, card_url, id_user: id,
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
