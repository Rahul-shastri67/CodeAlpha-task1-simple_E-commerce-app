app.post('/api/orders', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const cart = req.session.cart || [];
  if (cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  // Calculate total (simplest way: sum of item quantities * product price)
  let total = 0;
  for (let item of cart) {
    const prod = await require('./models/product').findById(item.productId);
    if (prod) total += prod.price * item.quantity;
  }
  // Create order
  const Order = require('./models/order');
  const order = new Order({
    userId: req.session.userId,
    items: cart,
    total
  });
  await order.save();
  // Clear cart
  req.session.cart = [];
  res.json({ success: true, orderId: order._id });
});
