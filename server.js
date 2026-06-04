const express = require('express');
const app = express();

// Products database
const products = [
  { id: "1", name: "Chrome Hearts Made In Hollywood Plus Cross T-Shirt Black/Red", priceUSD: 380, category: "T-Shirts" },
  { id: "2", name: "Chrome Hearts Matrix Script Hoodie Black/Red", priceUSD: 890, category: "Hoodies" },
  { id: "3", name: "Chrome Hearts Cemetery Ring Sterling Silver", priceUSD: 1950, category: "Rings" },
  { id: "4", name: "Chrome Hearts Trucker Hat Black", priceUSD: 260, category: "Hats" },
  { id: "5", name: "Chrome Hearts Paper Chain Necklace", priceUSD: 1200, category: "Necklaces" },
  { id: "6", name: "Chrome Hearts CH Denim Jeans Black", priceUSD: 1250, category: "Jeans" },
  { id: "7", name: "Chrome Hearts Tiny Cross Charm", priceUSD: 390, category: "Charms" },
  { id: "8", name: "Chrome Hearts Crossball Bracelet", priceUSD: 1300, category: "Bracelets" }
];

// Currency rates
const rates = {
  USD: 1,
  HKD: 7.82,
  RMB: 7.25,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 156.5
};

// API endpoint for products with currency conversion
app.get('/api/products', (req, res) => {
  const currency = req.query.currency || 'USD';
  const rate = rates[currency] || 1;
  
  const convertedProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    priceUSD: p.priceUSD,
    price: Math.round(p.priceUSD * rate),
    currency: currency
  }));
  
  res.json({
    success: true,
    products: convertedProducts,
    currency: currency,
    lastUpdated: new Date().toISOString()
  });
});

// Health check
app.get('/', (req, res) => {
  res.send('Chrome Hearts API is running! Try /api/products');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
