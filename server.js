const express = require('express');
const app = express();

const prices = {
  "Matrix Hoodie": 890,
  "Cemetery Ring": 1950,
  "Trucker Hat": 260
};

app.get('/api/prices', (req, res) => {
  res.json({ success: true, data: prices });
});

app.get('/', (req, res) => {
  res.send('Chrome API is live');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

