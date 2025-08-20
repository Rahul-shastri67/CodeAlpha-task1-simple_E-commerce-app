// Get all products
app.get('/api/products', async (req, res) => {
  const products = await require('./models/product').find();
  res.json(products);
});

// Get one product by ID
app.get('/api/products/:id', async (req, res) => {
  const product = await require('./models/product').findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});
