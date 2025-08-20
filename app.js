const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;



mongoose.connect('mongodb+srv://RahulShastri:7Z18jrX1e7b8yuvs@firstcluster.xkc0ufl.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));





app.use(express.json());{

const User = require('./models/user');

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
}





// Middleware
app.use(express.json());               // Parse JSON bodies
app.use(express.static('public'));    // Serve files in /public statically:contentReference[oaicite:4]{index=4} 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
})); // Setup session middleware (session data lives server-side:contentReference[oaicite:5]{index=5})

// (Routes will be added here...)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
