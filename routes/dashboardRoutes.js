const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<h1>Bienvenido al Dashboard, ${req.session.user?.username || 'Usuario'}!</h1>`);
});

module.exports = router;
