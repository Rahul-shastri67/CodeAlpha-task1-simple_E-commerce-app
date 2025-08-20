// Add a product to cart (by product ID)
app.post('/api/cart/add', async (req, res) => {
  const { id } = req.body;
  // Initialize cart if it doesn't exist
  if (!req.session.cart) req.session.cart = [];
  // Add item to session cart (quantity default 1)
  req.session.cart.push({ productId: id, quantity: 1 });
  res.json({ cart: req.session.cart });
});

// Remove an item from cart (by product ID)
app.post('/api/cart/remove', (req, res) => {
  const { id } = req.body;
  if (!req.session.cart) return res.json({ cart: [] });
  // Filter out the item to remove
  req.session.cart = req.session.cart.filter(item => item.productId !== id);
  res.json({ cart: req.session.cart });
});

// View cart contents
app.get('/api/cart', (req, res) => {
  res.json(req.session.cart || []);
});
