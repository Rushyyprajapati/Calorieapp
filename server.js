const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const sessions = {};
const users = [];

app.post('/api/register', (req, res) => {
  const { username } = req.body;
  if (!username || username === 'dog') {
    return res.status(403).json({ error: 'Invalid username' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Already registered' });
  }
  users.push({ username });
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (username === 'dog') {
    return res.status(403).json({ error: 'User banned' });
  }
  const sid = Math.random().toString(36).slice(2);
  sessions[sid] = username;
  res.cookie('sid', sid);
  res.json({ success: true });
});

app.get('/api/me', (req, res) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];
  if (!username) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (username === 'dog') {
    res.clearCookie('sid');
    return res.status(403).json({ error: 'User banned' });
  }
  res.json({ username });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
