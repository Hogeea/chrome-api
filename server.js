const express = require('express');
const app = express();

// ============================================
// 🔥 PREMIUM CHROME HEARTS DATABASE 🔥
// Real product names, USD base prices
// ============================================

const products = [
  // ===== T-SHIRTS =====
  { id: "ch-ts-001", name: "Chrome Hearts Made In Hollywood Plus Cross T-Shirt Black/Red Men's - US", basePriceUSD: 380, category: "T-Shirts" },
  { id: "ch-ts-002", name: "Chrome Hearts Cemetery Cross Script T-Shirt White/Black - US", basePriceUSD: 420, category: "T-Shirts" },
  { id: "ch-ts-003", name: "Chrome Hearts Dagger & Roses T-Shirt Black - US Men's", basePriceUSD: 450, category: "T-Shirts" },
  { id: "ch-ts-004", name: "Chrome Hearts Floral Cross Tee Cream - US", basePriceUSD: 410, category: "T-Shirts" },
  { id: "ch-ts-005", name: "Chrome Hearts Skull & Crossbones T-Shirt Black - US", basePriceUSD: 390, category: "T-Shirts" },
  
  // ===== HOODIES =====
  { id: "ch-hd-001", name: "Chrome Hearts Matrix Script Hoodie Black/Red - US Men's Large", basePriceUSD: 890, category: "Hoodies" },
  { id: "ch-hd-002", name: "Chrome Hearts Made In Hollywood Cross Zip Up Hoodie Black - US", basePriceUSD: 950, category: "Hoodies" },
  { id: "ch-hd-003", name: "Chrome Hearts Dagger Script Hoodie Cream - US", basePriceUSD: 820, category: "Hoodies" },
  { id: "ch-hd-004", name: "Chrome Hearts Floral Cross Hoodie Black/Pink - US", basePriceUSD: 1100, category: "Hoodies" },
  { id: "ch-hd-005", name: "Chrome Hearts Paperchain Hoodie Black - US", basePriceUSD: 980, category: "Hoodies" },
  
  // ===== JEANS =====
  { id: "ch-jn-001", name: "Chrome Hearts CH Denim Jeans Black - US Size 32", basePriceUSD: 1250, category: "Jeans" },
  { id: "ch-jn-002", name: "Chrome Hearts Cross Patch Jeans Blue - US Size 34", basePriceUSD: 1450, category: "Jeans" },
  { id: "ch-jn-003", name: "Chrome Hearts Dagger Embroidered Denim Black - US", basePriceUSD: 1380, category: "Jeans" },
  
  // ===== RINGS =====
  { id: "ch-rg-001", name: "Chrome Hearts Cemetery Ring Sterling Silver - US Size 9", basePriceUSD: 1950, category: "Rings" },
  { id: "ch-rg-002", name: "Chrome Hearts Forever Ring Sterling Silver & 14k Gold - US", basePriceUSD: 950, category: "Rings" },
  { id: "ch-rg-003", name: "Chrome Hearts Dagger Ring Sterling Silver - US Size 8", basePriceUSD: 820, category: "Rings" },
  { id: "ch-rg-004", name: "Chrome Hearts Classic Cross Ring Sterling Silver - US", basePriceUSD: 680, category: "Rings" },
  { id: "ch-rg-005", name: "Chrome Hearts Eternal Ring 18k Gold - US Size 10", basePriceUSD: 4400, category: "Rings" },
  
  // ===== CHARMS =====
  { id: "ch-ch-001", name: "Chrome Hearts Tiny Cross Charm Sterling Silver - US", basePriceUSD: 390, category: "Charms" },
  { id: "ch-ch-002", name: "Chrome Hearts Star Charm Sterling Silver - US", basePriceUSD: 310, category: "Charms" },
  { id: "ch-ch-003", name: "Chrome Hearts Dagger Pendant Sterling Silver - US", basePriceUSD: 590, category: "Charms" },
  { id: "ch-ch-004", name: "Chrome Hearts Kiss Pendant 14k Gold - US", basePriceUSD: 2950, category: "Charms" },
  
  // ===== NECKLACES =====
  { id: "ch-nk-001", name: "Chrome Hearts Paper Chain Necklace Sterling Silver 24 inch - US", basePriceUSD: 1200, category: "Necklaces" },
  { id: "ch-nk-002", name: "Chrome Hearts Cuban Link Chain 14k Gold 22 inch - US", basePriceUSD: 2200, category: "Necklaces" },
  { id: "ch-nk-003", name: "Chrome Hearts Ball Chain Necklace Sterling Silver - US", basePriceUSD: 520, category: "Necklaces" },
  
  // ===== HATS =====
  { id: "ch-ht-001", name: "Chrome Hearts Trucker Hat Black Mesh - US One Size", basePriceUSD: 260, category: "Hats" },
  { id: "ch-ht-002", name: "Chrome Hearts Beanie Black Wool - US", basePriceUSD: 190, category: "Hats" },
  { id: "ch-ht-003", name: "Chrome Hearts Fitted Cap Black/Red - US Size 7 1/2", basePriceUSD: 280, category: "Hats" }
];

// ============================================
// 💱 CURRENCY CONVERSION RATES
// Base: USD
// ============================================

const exchangeRates = {
  USD: 1.00,
  HKD: 7.82,
  RMB: 7.25,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 156.50,
  KRW: 1360.00,
  SGD: 1.35,
  AUD: 1.50,
  CAD: 1.37
};

// ============================================
// 📊 Simulate live price fluctuations
// ============================================

function getLivePriceUSD(basePrice) {
  const variation = (Math.random() - 0.5) * 0.06; // -3% to +3%
  return Math.max(50, Math.round(basePrice * (1 + variation)));
}

// ============================================
// 🔥 API ENDPOINTS
// ============================================

// Get all products with optional currency conversion
app.get('/api/products', (req, res) => {
  const currency = req.query.currency || 'USD';
  const rate = exchangeRates[currency] || 1;
  
  const productsWithLivePrices = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    priceUSD: getLivePriceUSD(p.basePriceUSD),
    priceConverted: Math.round(getLivePriceUSD(p.basePriceUSD) * rate),
    currency: currency
  }));
  
  res.json({
    success: true,
    totalProducts: productsWithLivePrices.length,
    currency: currency,
    exchangeRate: rate,
    lastUpdated: new Date().toISOString(),
    products: productsWithLivePrices
  });
});

// Get supported currencies
app.get('/api/currencies', (req, res) => {
  res.json({
    success: true,
    currencies: Object.keys(exchangeRates).map(code => ({
      code: code,
      symbol: getCurrencySymbol(code),
      rate: exchangeRates[code]
    }))
  });
});

// Get single product by ID
app.get('/api/product/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  const currency = req.query.currency || 'USD';
  const rate = exchangeRates[currency] || 1;
  
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  
  res.json({
    success: true,
    id: product.id,
    name: product.name,
    category: product.category,
    priceUSD: getLivePriceUSD(product.basePriceUSD),
    priceConverted: Math.round(getLivePriceUSD(product.basePriceUSD) * rate),
    currency: currency
  });
});

// Health check
app.get('/', (req, res) => {
  res.send('🔥 Chrome Hearts Premium API | Multi-Currency Ready');
});

function getCurrencySymbol(code) {
  const symbols = {
    USD: '$', HKD: 'HK$', RMB: '¥', EUR: '€', 
    GBP: '£', JPY: '¥', KRW: '₩', SGD: 'S$', 
    AUD: 'A$', CAD: 'C$'
  };
  return symbols[code] || code;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Chrome Hearts Premium API running on port ${PORT}`);
  console.log(`📦 ${products.length} products loaded`);
  console.log(`💱 ${Object.keys(exchangeRates).length} currencies supported`);
});
