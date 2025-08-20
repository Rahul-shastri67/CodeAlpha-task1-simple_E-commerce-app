// Register new user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  // Check if user exists (not shown: add error handling)
  const newUser = new (require('./models/user'))({ username, password });
  await newUser.save();
  res.json({ success: true });
});

// Login user
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const User = require('./models/user');
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Store user ID in session to keep them logged in
  req.session.userId = user._id;  // session now knows this user is logged in:contentReference[oaicite:13]{index=13}
  res.json({ success: true });
});

// Logout user
app.post('/api/logout', (req, res) => {
  req.session.userId = null;
  res.json({ success: true });
});
